import { useState, useRef, useEffect, useCallback } from "react";
import { createFileRoute, useSearch, useRouter } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Save, Share2, Play, ArrowLeft, Dice5, Wind as WindIcon, Check } from "lucide-react";

export const Route = createFileRoute("/workshop_/designer")({
  component: KiteDesigner,
  validateSearch: (search: Record<string, unknown>) => ({
    span: Number(search.span) || 80,
    tail: Number(search.tail) || 30,
    line: Number(search.line) || 2,
    shape: (search.shape as "diamond" | "swallow" | "butterfly" | "dragon") || "diamond",
    material: (search.material as "paper" | "silk" | "cloth") || "paper",
    colorTheme: (search.colorTheme as "red-green" | "blue-white" | "gold-red" | "purple-pink" | "porcelain" | "dunhuang") || "red-green",
    pattern: (search.pattern as "none" | "cloud" | "flower" | "geometric") || "none",
  }),
});

type KiteShape = "diamond" | "swallow" | "butterfly" | "dragon";
type KiteMaterial = "paper" | "silk" | "cloth";
type ColorTheme = "red-green" | "blue-white" | "gold-red" | "purple-pink" | "porcelain" | "dunhuang";
type Pattern = "none" | "cloud" | "flower" | "geometric";

interface KiteParams {
  span: number;
  tail: number;
  lineType: 1 | 2 | 3;
  shape: KiteShape;
  material: KiteMaterial;
  colorTheme: ColorTheme;
  pattern: Pattern;
}

// 传统色系配色（扩展至6种）
function getColorTheme(theme: ColorTheme) {
  const themes = {
    "red-green": { 
      primary: "#C23B22",   // 朱红
      secondary: "#2E8B57", // 翠绿
      accent: "#F0C05A",    // 缃色
      gradientStart: "#E86B5A",
      gradientEnd: "#C23B22"
    },
    "blue-white": { 
      primary: "#1A4F7A",   // 靛蓝
      secondary: "#FFFFFF", // 白
      accent: "#F0C05A",    // 缃色
      gradientStart: "#5B8DB8",
      gradientEnd: "#1A4F7A"
    },
    "gold-red": { 
      primary: "#9B7E9E",   // 紫藤
      secondary: "#FFD700", // 金色
      accent: "#6B4C7A",    // 深紫
      gradientStart: "#C8A8D0",
      gradientEnd: "#9B7E9E"
    },
    "purple-pink": { 
      primary: "#2C2C2C",   // 墨黑
      secondary: "#E34234", // 朱砂
      accent: "#F5F0E6",    // 米白
      gradientStart: "#5A5A5A",
      gradientEnd: "#2C2C2C"
    },
    "porcelain": {
      primary: "#1E3A5F",   // 靛青
      secondary: "#E8F4F8", // 月白
      accent: "#0047AB",    // 钴蓝
      gradientStart: "#4A9E7A",
      gradientEnd: "#1E3A5F"
    },
    "dunhuang": {
      primary: "#2F5D8F",   // 石青
      secondary: "#D4A54A", // 土黄
      accent: "#C23B22",    // 朱红
      gradientStart: "#E8C07A",
      gradientEnd: "#D4A54A"
    },
  };
  return themes[theme];
}

// 绘制菱形骨架（米字结构 + 节点）
function drawDiamondFrame(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number) {
  ctx.strokeStyle = "#8B7355";
  
  // 十字形主骨架（加粗）
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 3]);
  ctx.beginPath();
  ctx.moveTo(cx, cy - span * 0.4);
  ctx.lineTo(cx, cy + span * 0.5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - span * 0.3, cy);
  ctx.lineTo(cx + span * 0.3, cy);
  ctx.stroke();

  // 菱形边框（实线加粗）
  ctx.setLineDash([]);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - span * 0.4);
  ctx.lineTo(cx + span * 0.3, cy);
  ctx.lineTo(cx, cy + span * 0.5);
  ctx.lineTo(cx - span * 0.3, cy);
  ctx.closePath();
  ctx.stroke();

  // 四个角的"米"字形辅助线
  ctx.setLineDash([3, 2]);
  ctx.lineWidth = 0.8;
  const cornerSize = span * 0.1;
  const corners = [
    { x: cx, y: cy - span * 0.4 },   // 上
    { x: cx, y: cy + span * 0.5 },   // 下
    { x: cx - span * 0.3, y: cy },   // 左
    { x: cx + span * 0.3, y: cy },   // 右
  ];
  
  corners.forEach(({ x, y }) => {
    // 向外延伸
    const dx = (x - cx) / Math.abs(x - cx || 1);
    const dy = (y - cy) / Math.abs(y - cy || 1);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx * cornerSize, y + dy * cornerSize);
    ctx.stroke();
    
    // 向内延伸
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - dx * cornerSize * 0.5, y - dy * cornerSize * 0.5);
    ctx.stroke();
  });

  // 对角线交叉点的圆形节点
  ctx.fillStyle = "#8B7355";
  const nodePositions = [
    { x: cx, y: cy },                          // 中心
    { x: cx, y: cy - span * 0.4 },            // 上角
    { x: cx, y: cy + span * 0.5 },            // 下角
    { x: cx - span * 0.3, y: cy },            // 左角
    { x: cx + span * 0.3, y: cy },            // 右角
  ];
  
  nodePositions.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.setLineDash([]);
}

// 绘制燕子骨架（纯圆形造型）
function drawSwallowFrame(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number) {
  ctx.strokeStyle = "#8B7355";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // === 主体：完美的圆形 ===
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, span * 0.25, 0, Math.PI * 2);
  ctx.stroke();
}

// 绘制爱心骨架（经典爱心造型：双圆弧顶部 + 尖底）
function drawButterflyFrame(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number) {
  ctx.strokeStyle = "#8B7355";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // === 主体：完美的爱心 ===
  ctx.lineWidth = 2;
  ctx.beginPath();
  // 从底部尖端开始
  ctx.moveTo(cx, cy + span * 0.4);
  // 左侧弧线（向上到左半圆顶）
  ctx.bezierCurveTo(
    cx - span * 0.1, cy + span * 0.3,
    cx - span * 0.3, cy + span * 0.1,
    cx - span * 0.3, cy - span * 0.05
  );
  // 左半圆顶（圆润凸起）
  ctx.bezierCurveTo(
    cx - span * 0.3, cy - span * 0.2,
    cx - span * 0.2, cy - span * 0.25,
    cx - span * 0.1, cy - span * 0.2
  );
  // 顶部凹陷处
  ctx.lineTo(cx, cy - span * 0.15);
  // 右半圆顶（圆润凸起）
  ctx.lineTo(cx + span * 0.1, cy - span * 0.2);
  ctx.bezierCurveTo(
    cx + span * 0.2, cy - span * 0.25,
    cx + span * 0.3, cy - span * 0.2,
    cx + span * 0.3, cy - span * 0.05
  );
  // 右侧弧线（向下回到尖端）
  ctx.bezierCurveTo(
    cx + span * 0.3, cy + span * 0.1,
    cx + span * 0.1, cy + span * 0.3,
    cx, cy + span * 0.4
  );
  ctx.closePath();
  ctx.stroke();

  // 爱心内部的十字骨架
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 2]);
  // 垂直线
  ctx.beginPath();
  ctx.moveTo(cx, cy - span * 0.25);
  ctx.lineTo(cx, cy + span * 0.35);
  ctx.stroke();
  // 水平线
  ctx.beginPath();
  ctx.moveTo(cx - span * 0.25, cy - span * 0.05);
  ctx.lineTo(cx + span * 0.25, cy - span * 0.05);
  ctx.stroke();
  ctx.setLineDash([]);

  // 内部装饰纹理（放射状细线）
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const startX = cx + Math.cos(angle) * span * 0.08;
    const startY = cy - span * 0.05 + Math.sin(angle) * span * 0.08;
    const endX = cx + Math.cos(angle) * span * 0.22;
    const endY = cy - span * 0.05 + Math.sin(angle) * span * 0.22;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}

// 绘制叶型骨架（经典叶片造型：中脉 + 侧脉 + 锯齿边缘）
function drawDragonFrame(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number) {
  ctx.strokeStyle = "#8B7355";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // === 主体：叶片轮廓 ===
  ctx.lineWidth = 2;
  ctx.beginPath();
  // 从叶柄底部开始
  ctx.moveTo(cx, cy + span * 0.4);
  // 左侧弧线（向上到叶尖）
  ctx.bezierCurveTo(
    cx - span * 0.15, cy + span * 0.25,
    cx - span * 0.25, cy,
    cx - span * 0.15, cy - span * 0.2
  );
  // 叶尖
  ctx.quadraticCurveTo(cx, cy - span * 0.35, cx, cy - span * 0.4);
  // 右侧弧线（向下回到叶柄）
  ctx.bezierCurveTo(
    cx + span * 0.15, cy - span * 0.2,
    cx + span * 0.25, cy,
    cx + span * 0.15, cy + span * 0.25
  );
  ctx.quadraticCurveTo(cx, cy + span * 0.35, cx, cy + span * 0.4);
  ctx.closePath();
  ctx.stroke();

  // 叶脉系统
  ctx.lineWidth = 1.5;

  // 中脉（主叶脉）
  ctx.beginPath();
  ctx.moveTo(cx, cy + span * 0.35);
  ctx.lineTo(cx, cy - span * 0.35);
  ctx.stroke();

  // 侧脉（左右对称，6对）
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const t = (i + 1) / 7;
    const y = cy - span * 0.3 + span * 0.6 * t;
    const width = span * 0.15 * (1 - Math.abs(t - 0.5) * 1.5);

    // 左侧脉
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(
      cx - span * 0.08, y - span * 0.03,
      cx - width, y - span * 0.05
    );
    ctx.stroke();

    // 右侧脉
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(
      cx + span * 0.08, y - span * 0.03,
      cx + width, y - span * 0.05
    );
    ctx.stroke();
  }

  // 细脉（更小的分支）
  ctx.lineWidth = 0.7;
  for (let i = 0; i < 8; i++) {
    const t = (i + 1) / 9;
    const y = cy - span * 0.25 + span * 0.5 * t;
    const width = span * 0.1 * (1 - Math.abs(t - 0.5));

    // 左侧细脉
    ctx.beginPath();
    ctx.moveTo(cx - width * 0.5, y);
    ctx.lineTo(cx - width * 0.8, y - span * 0.03);
    ctx.stroke();

    // 右侧细脉
    ctx.beginPath();
    ctx.moveTo(cx + width * 0.5, y);
    ctx.lineTo(cx + width * 0.8, y - span * 0.03);
    ctx.stroke();
  }
}

// 绘制风筝形状轮廓
function drawKiteShape(ctx: CanvasRenderingContext2D, shape: KiteShape, cx: number, cy: number, span: number) {
  ctx.beginPath();

  if (shape === "diamond") {
    ctx.moveTo(cx, cy - span * 0.4);
    ctx.lineTo(cx + span * 0.3, cy);
    ctx.lineTo(cx, cy + span * 0.5);
    ctx.lineTo(cx - span * 0.3, cy);
  } else if (shape === "swallow") {
    // 完美圆形主体（匹配 drawSwallowFrame 的圆形，半径一致避免溢出）
    ctx.arc(cx, cy, span * 0.25, 0, Math.PI * 2);
  } else if (shape === "butterfly") {
    // 爱心主体（匹配 drawButterflyFrame 的爱心）
    ctx.moveTo(cx, cy + span * 0.42);
    ctx.bezierCurveTo(
      cx - span * 0.11, cy + span * 0.32,
      cx - span * 0.32, cy + span * 0.1,
      cx - span * 0.32, cy - span * 0.05
    );
    ctx.bezierCurveTo(
      cx - span * 0.32, cy - span * 0.22,
      cx - span * 0.22, cy - span * 0.27,
      cx - span * 0.11, cy - span * 0.22
    );
    ctx.lineTo(cx, cy - span * 0.16);
    ctx.lineTo(cx + span * 0.11, cy - span * 0.22);
    ctx.bezierCurveTo(
      cx + span * 0.22, cy - span * 0.27,
      cx + span * 0.32, cy - span * 0.22,
      cx + span * 0.32, cy - span * 0.05
    );
    ctx.bezierCurveTo(
      cx + span * 0.32, cy + span * 0.1,
      cx + span * 0.11, cy + span * 0.32,
      cx, cy + span * 0.42
    );
  } else if (shape === "dragon") {
    // 叶片主体（匹配 drawDragonFrame 的叶型）
    ctx.moveTo(cx, cy + span * 0.42);
    ctx.bezierCurveTo(
      cx - span * 0.16, cy + span * 0.27,
      cx - span * 0.27, cy,
      cx - span * 0.16, cy - span * 0.22
    );
    ctx.quadraticCurveTo(cx, cy - span * 0.37, cx, cy - span * 0.42);
    ctx.bezierCurveTo(
      cx + span * 0.16, cy - span * 0.22,
      cx + span * 0.27, cy,
      cx + span * 0.16, cy + span * 0.27
    );
    ctx.quadraticCurveTo(cx, cy + span * 0.37, cx, cy + span * 0.42);
  }

  ctx.closePath();
}

// 绘制纸纹颗粒（优化版：减少点数，提高性能）
function drawPaperTexture(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();

  // 随机点阵（200个点，透明度适中）
  ctx.fillStyle = "rgba(139, 115, 85, 0.08)";
  for (let i = 0; i < 200; i++) {
    const rx = x + Math.random() * w;
    const ry = y + Math.random() * h;
    const size = Math.random() * 2 + 0.5;
    ctx.globalAlpha = Math.random() * 0.06 + 0.04;
    ctx.fillRect(rx, ry, size, size);
  }

  // 纤维纹理（加粗线条）
  ctx.strokeStyle = "rgba(139, 115, 85, 0.06)";
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 15; i++) {
    const startX = x + Math.random() * w;
    const startY = y + Math.random() * h;
    const angle = Math.random() * Math.PI * 2;
    const length = Math.random() * 12 + 6;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
    ctx.stroke();
  }

  ctx.restore();
}

// 绘制云纹（传统祥云曲线，对称分布）
function drawCloudPattern(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number, colors: any) {
  const gradientStart = "#FFFFFF";
  const gradientEnd = "#E0E0E0";

  ctx.save();

  // 左侧祥云（3朵）
  const leftX = cx - span * 0.15;
  const leftY = cy - span * 0.1;

  for (let i = 0; i < 3; i++) {
    const offsetY = i * span * 0.12;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"; // 白色底衬
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.7;

    ctx.beginPath();
    ctx.moveTo(leftX - span * 0.08, leftY + offsetY);
    ctx.bezierCurveTo(
      leftX - span * 0.12, leftY + offsetY - span * 0.04,
      leftX - span * 0.06, leftY + offsetY - span * 0.06,
      leftX, leftY + offsetY
    );
    ctx.bezierCurveTo(
      leftX + span * 0.04, leftY + offsetY + span * 0.03,
      leftX + span * 0.02, leftY + offsetY - span * 0.02,
      leftX + span * 0.06, leftY + offsetY - span * 0.04
    );
    ctx.stroke();

    // 第二层：白色渐变描边
    const cloudGradient = ctx.createLinearGradient(leftX - span * 0.12, leftY + offsetY - span * 0.06, leftX + span * 0.06, leftY + offsetY + span * 0.03);
    cloudGradient.addColorStop(0, gradientStart);
    cloudGradient.addColorStop(1, gradientEnd);
    ctx.strokeStyle = cloudGradient;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(leftX - span * 0.08, leftY + offsetY);
    ctx.bezierCurveTo(
      leftX - span * 0.12, leftY + offsetY - span * 0.04,
      leftX - span * 0.06, leftY + offsetY - span * 0.06,
      leftX, leftY + offsetY
    );
    ctx.bezierCurveTo(
      leftX + span * 0.04, leftY + offsetY + span * 0.03,
      leftX + span * 0.02, leftY + offsetY - span * 0.02,
      leftX + span * 0.06, leftY + offsetY - span * 0.04
    );
    ctx.stroke();
  }

  // 右侧祥云（3朵，对称）
  const rightX = cx + span * 0.15;
  const rightY = cy + span * 0.1;

  for (let i = 0; i < 3; i++) {
    const offsetY = i * span * 0.12;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.7;

    ctx.beginPath();
    ctx.moveTo(rightX + span * 0.08, rightY - offsetY);
    ctx.bezierCurveTo(
      rightX + span * 0.12, rightY - offsetY + span * 0.04,
      rightX + span * 0.06, rightY - offsetY + span * 0.06,
      rightX, rightY - offsetY
    );
    ctx.bezierCurveTo(
      rightX - span * 0.04, rightY - offsetY - span * 0.03,
      rightX - span * 0.02, rightY - offsetY + span * 0.02,
      rightX - span * 0.06, rightY - offsetY + span * 0.04
    );
    ctx.stroke();

    const cloudGradient2 = ctx.createLinearGradient(rightX - span * 0.06, rightY - offsetY - span * 0.04, rightX + span * 0.12, rightY - offsetY + span * 0.06);
    cloudGradient2.addColorStop(0, gradientStart);
    cloudGradient2.addColorStop(1, gradientEnd);
    ctx.strokeStyle = cloudGradient2;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(rightX + span * 0.08, rightY - offsetY);
    ctx.bezierCurveTo(
      rightX + span * 0.12, rightY - offsetY + span * 0.04,
      rightX + span * 0.06, rightY - offsetY + span * 0.06,
      rightX, rightY - offsetY
    );
    ctx.bezierCurveTo(
      rightX - span * 0.04, rightY - offsetY - span * 0.03,
      rightX - span * 0.02, rightY - offsetY + span * 0.02,
      rightX - span * 0.06, rightY - offsetY + span * 0.04
    );
    ctx.stroke();
  }

  ctx.restore();
}

// 绘制花卉（牡丹+梅花组合）
function drawFlowerPattern(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number, colors: any) {
  const gradientStart = "#FFFFFF";
  const gradientEnd = "#E0E0E0";

  ctx.save();
  ctx.globalAlpha = 0.85;

  // 右下角牡丹（5瓣大花）
  const fx = cx + span * 0.18;
  const fy = cy + span * 0.28;
  const petalSize = span * 0.1;

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const px = fx + Math.cos(angle) * petalSize;
    const py = fy + Math.sin(angle) * petalSize;
    ctx.lineWidth = 2.5;

    const petalGradient = ctx.createLinearGradient(px - petalSize * 0.6, py - petalSize * 0.6, px + petalSize * 0.6, py + petalSize * 0.6);
    petalGradient.addColorStop(0, gradientStart);
    petalGradient.addColorStop(1, gradientEnd);
    ctx.strokeStyle = petalGradient;

    ctx.beginPath();
    ctx.arc(px, py, petalSize * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 花蕊渐变填充
  const centerGradient = ctx.createRadialGradient(fx, fy, 0, fx, fy, petalSize * 0.35);
  centerGradient.addColorStop(0, gradientStart);
  centerGradient.addColorStop(1, gradientEnd);
  ctx.fillStyle = centerGradient;
  ctx.beginPath();
  ctx.arc(fx, fy, petalSize * 0.35, 0, Math.PI * 2);
  ctx.fill();

  // 左上角梅花（5瓣小花）
  const fx2 = cx - span * 0.18;
  const fy2 = cy - span * 0.22;
  const petalSize2 = span * 0.065;

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const px = fx2 + Math.cos(angle) * petalSize2;
    const py = fy2 + Math.sin(angle) * petalSize2;
    ctx.lineWidth = 2;

    const smallPetalGradient = ctx.createLinearGradient(px - petalSize2 * 0.5, py - petalSize2 * 0.5, px + petalSize2 * 0.5, py + petalSize2 * 0.5);
    smallPetalGradient.addColorStop(0, gradientStart);
    smallPetalGradient.addColorStop(1, gradientEnd);
    ctx.strokeStyle = smallPetalGradient;

    ctx.beginPath();
    ctx.arc(px, py, petalSize2 * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 梅花花蕊（星形排列）渐变填充
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const rx = fx2 + Math.cos(angle) * petalSize2 * 0.3;
    const ry = fy2 + Math.sin(angle) * petalSize2 * 0.3;

    const stamenGradient = ctx.createRadialGradient(rx, ry, 0, rx, ry, 2.5);
    stamenGradient.addColorStop(0, gradientStart);
    stamenGradient.addColorStop(1, gradientEnd);
    ctx.fillStyle = stamenGradient;

    ctx.beginPath();
    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 枝叶渐变描边
  const branchGradient = ctx.createLinearGradient(fx - span * 0.05, fy + span * 0.05, fx - span * 0.14, fy + span * 0.18);
  branchGradient.addColorStop(0, gradientStart);
  branchGradient.addColorStop(1, gradientEnd);
  ctx.lineWidth = 2;
  ctx.strokeStyle = branchGradient;
  ctx.beginPath();
  ctx.moveTo(fx - span * 0.05, fy + span * 0.05);
  ctx.quadraticCurveTo(fx - span * 0.1, fy + span * 0.1, fx - span * 0.14, fy + span * 0.18);
  ctx.stroke();

  const branchGradient2 = ctx.createLinearGradient(fx2 + span * 0.05, fy2 - span * 0.05, fx2 + span * 0.14, fy2 - span * 0.18);
  branchGradient2.addColorStop(0, gradientStart);
  branchGradient2.addColorStop(1, gradientEnd);
  ctx.strokeStyle = branchGradient2;
  ctx.beginPath();
  ctx.moveTo(fx2 + span * 0.05, fy2 - span * 0.05);
  ctx.quadraticCurveTo(fx2 + span * 0.1, fy2 - span * 0.1, fx2 + span * 0.14, fy2 - span * 0.18);
  ctx.stroke();

  // 叶子（椭圆变形）渐变描边
  const leafGradient = ctx.createLinearGradient(fx - span * 0.15, fy + span * 0.11, fx - span * 0.07, fy + span * 0.16);
  leafGradient.addColorStop(0, gradientStart);
  leafGradient.addColorStop(1, gradientEnd);
  ctx.strokeStyle = leafGradient;
  ctx.beginPath();
  ctx.ellipse(fx - span * 0.11, fy + span * 0.135, span * 0.05, span * 0.025, Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();

  const leafGradient2 = ctx.createLinearGradient(fx2 + span * 0.07, fy2 - span * 0.16, fx2 + span * 0.15, fy2 - span * 0.11);
  leafGradient2.addColorStop(0, gradientStart);
  leafGradient2.addColorStop(1, gradientEnd);
  ctx.strokeStyle = leafGradient2;
  ctx.beginPath();
  ctx.ellipse(fx2 + span * 0.11, fy2 - span * 0.135, span * 0.05, span * 0.025, -Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

// 绘制几何底纹（嵌套同心菱形）
function drawGeometricPattern(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number, colors: any) {
  ctx.save();

  const gradientStart = "#FFFFFF";
  const gradientEnd = "#E0E0E0";

  // 绘制3层嵌套菱形
  for (let layer = 0; layer < 3; layer++) {
    const scale = 1 - layer * 0.25;
    const halfW = span * 0.25 * scale;
    const halfH = span * 0.35 * scale;

    ctx.globalAlpha = 0.7 - layer * 0.15; // 透明度：0.7 / 0.55 / 0.4

    const diamondGradient = ctx.createLinearGradient(cx - halfW, cy - halfH, cx + halfW, cy + halfH);
    diamondGradient.addColorStop(0, gradientStart);
    diamondGradient.addColorStop(1, gradientEnd);
    ctx.strokeStyle = diamondGradient;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(cx, cy - halfH); // 上顶点
    ctx.lineTo(cx + halfW, cy); // 右顶点
    ctx.lineTo(cx, cy + halfH); // 下顶点
    ctx.lineTo(cx - halfW, cy); // 左顶点
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();
}

// 材质表现：纸质毛边（增强版：40个突起）
function drawPaperEdge(ctx: CanvasRenderingContext2D, shape: KiteShape, cx: number, cy: number, span: number) {
  ctx.strokeStyle = "rgba(139, 115, 85, 0.3)";
  ctx.lineWidth = 0.5;

  const points = 40;
  for (let i = 0; i < points; i++) {
    const t = i / points;
    let x, y;

    if (shape === "diamond") {
      const side = Math.floor(t * 4);
      const localT = (t * 4) % 1;
      if (side === 0) { x = cx + localT * span * 0.3; y = cy - span * 0.4 + localT * span * 0.4; }
      else if (side === 1) { x = cx + span * 0.3 - localT * span * 0.3; y = cy + localT * span * 0.5; }
      else if (side === 2) { x = cx - localT * span * 0.3; y = cy + span * 0.5 - localT * span * 0.5; }
      else { x = cx - span * 0.3 + localT * span * 0.3; y = cy - localT * span * 0.4; }
    } else {
      x = cx + Math.cos(t * Math.PI * 2) * span * 0.3;
      y = cy + Math.sin(t * Math.PI * 2) * span * 0.4;
    }

    const offsetX = (Math.random() - 0.5) * 4;
    const offsetY = (Math.random() - 0.5) * 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(
      x + offsetX * 0.5, y + offsetY * 0.5,
      x + offsetX, y + offsetY
    );
    ctx.stroke();
  }
}

// 材质表现：绢质柔光（流动光泽）
function drawSilkGlow(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, time: number) {
  // 流动的高光中心点
  const glowOffsetX = Math.sin(time / 1000) * 20;
  const glowOffsetY = Math.cos(time / 1000) * 15;

  const glowGradient = ctx.createRadialGradient(
    x + w / 2 + glowOffsetX,
    y + h / 2 + glowOffsetY,
    0,
    x + w / 2 + glowOffsetX,
    y + h / 2 + glowOffsetY,
    Math.max(w, h) * 0.6
  );
  glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
  glowGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.2)");
  glowGradient.addColorStop(0.6, "rgba(255, 255, 255, 0.1)");
  glowGradient.addColorStop(0.8, "rgba(255, 255, 255, 0.05)");
  glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  
  ctx.fillStyle = glowGradient;
  ctx.fillRect(x, y, w, h);

  // 左上角高光光斑
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.2, y + h * 0.2, w * 0.25, h * 0.15, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fill();
  ctx.globalAlpha = 1;
}

// 材质表现：布质编织纹理（低密度，极低透明度）
function drawClothWeave(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"; // 极低透明度
  ctx.lineWidth = 0.8;

  // 横向经纬线（间距3px，降低密度）
  const hLines = Math.floor(h / 3);
  for (let i = 0; i < hLines; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + i * 3);
    ctx.lineTo(x + w, y + i * 3);
    ctx.stroke();
  }

  // 纵向经纬线
  const vLines = Math.floor(w / 3);
  for (let j = 0; j < vLines; j++) {
    ctx.beginPath();
    ctx.moveTo(x + j * 3, y);
    ctx.lineTo(x + j * 3, y + h);
    ctx.stroke();
  }

  ctx.restore();
}

// 主绘制函数（严格遵循 4 层图层顺序）
function drawKite(
  ctx: CanvasRenderingContext2D,
  params: KiteParams,
  width: number,
  height: number,
  animation?: "stable" | "spin" | "crash",
  position?: { x: number; y: number; rotation: number },
  time?: number
) {
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) / 200;

  const span = params.span * scale;
  const tailLength = params.tail * scale;
  const colors = getColorTheme(params.colorTheme);

  // 应用位置偏移和旋转
  let renderCenterX = centerX;
  let renderCenterY = centerY;
  let rotation = 0;

  if (position) {
    renderCenterX = centerX + position.x;
    renderCenterY = centerY + position.y;
    rotation = position.rotation;
  }

  ctx.save();
  ctx.translate(renderCenterX, renderCenterY);
  ctx.rotate(rotation);
  ctx.translate(-renderCenterX, -renderCenterY);

  // ============================================
  // 第1层：底色渐变（立体感，从左上到右下柔和过渡）
  // ============================================
  ctx.save();
  drawKiteShape(ctx, params.shape, renderCenterX, renderCenterY, span);
  ctx.closePath();
  ctx.clip(); // 裁剪区域，限制后续绘制在风筝形状内

  const gradient = ctx.createLinearGradient(
    renderCenterX - span * 0.35,
    renderCenterY - span * 0.45,
    renderCenterX + span * 0.35,
    renderCenterY + span * 0.55
  );
  gradient.addColorStop(0, colors.gradientStart);
  gradient.addColorStop(1, colors.gradientEnd);
  ctx.fillStyle = gradient;
  ctx.fill();

  // ============================================
  // 第2层：材质纹理（极低透明度，不盖住底色）
  // ============================================
  if (params.material === "paper") {
    drawPaperTexture(ctx, renderCenterX - span * 0.4, renderCenterY - span * 0.5, span * 0.8, span * 1.0);
  } else if (params.material === "silk") {
    drawSilkGlow(ctx, renderCenterX - span * 0.4, renderCenterY - span * 0.5, span * 0.8, span * 1.0, time || 0);
  } else if (params.material === "cloth") {
    ctx.save();
    ctx.globalAlpha = 0.05; // 极低透明度
    drawClothWeave(ctx, renderCenterX - span * 0.4, renderCenterY - span * 0.5, span * 0.8, span * 1.0);
    ctx.restore();
  }

  // ============================================
  // 第3层：装饰纹样（精致对称，被 clip 限制）
  // ============================================
  if (params.pattern === "cloud") {
    drawCloudPattern(ctx, renderCenterX, renderCenterY, span, colors);
  } else if (params.pattern === "flower") {
    drawFlowerPattern(ctx, renderCenterX, renderCenterY, span, colors);
  } else if (params.pattern === "geometric") {
    drawGeometricPattern(ctx, renderCenterX, renderCenterY, span, colors);
  }

  ctx.restore(); // 结束裁剪，后续绘制不受限制

  // ============================================
  // 第4层：骨架与轮廓（最顶层，清晰可见）
  // ============================================
  // 外侧轮廓线
  ctx.strokeStyle = "#6A5B4B"; // 深竹木色
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  drawKiteShape(ctx, params.shape, renderCenterX, renderCenterY, span);
  ctx.stroke();

  // 内部骨架
  if (params.shape === "diamond") {
    drawDiamondFrame(ctx, renderCenterX, renderCenterY, span);
  } else if (params.shape === "swallow") {
    drawSwallowFrame(ctx, renderCenterX, renderCenterY, span);
  } else if (params.shape === "butterfly") {
    drawButterflyFrame(ctx, renderCenterX, renderCenterY, span);
  } else if (params.shape === "dragon") {
    drawDragonFrame(ctx, renderCenterX, renderCenterY, span);
  }

  // 尾巴（飘带曲线）
  if (params.tail > 0) {
    drawTail(ctx, renderCenterX, renderCenterY, span, tailLength, time || 0);
  }

  // 提线（从顶部中心向上汇聚）
  drawBridle(ctx, renderCenterX, renderCenterY, span, params.lineType);

  ctx.restore(); // 恢复初始变换

  // 额外的动画效果
  if (animation === "spin") {
    ctx.save();
    ctx.translate(renderCenterX, renderCenterY);
    ctx.rotate(Date.now() / 200);
    ctx.translate(-renderCenterX, -renderCenterY);
    ctx.restore();
  } else if (animation === "crash") {
    ctx.save();
    ctx.translate(renderCenterX, renderCenterY + 30);
    ctx.rotate(Math.PI / 6);
    ctx.translate(-renderCenterX, -(renderCenterY + 30));
    ctx.restore();
  }
}

// 绘制尾巴（飘带曲线，随风弯曲）
function drawTail(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number, tailLength: number, time: number) {
  ctx.strokeStyle = "#8B7355";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(cx, cy + span * 0.5);

  const segments = 8;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const amplitude = tailLength * 0.15; // 振幅与尾长成比例
    const x = cx + Math.sin(t * Math.PI * 3 + time / 400) * amplitude * (1 - t * 0.5);
    const y = cy + span * 0.5 + t * tailLength;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

// 绘制提线（从顶部中心向上汇聚）
function drawBridle(ctx: CanvasRenderingContext2D, cx: number, cy: number, span: number, lineType: number) {
  const linePoints = lineType === 1 ? 1 : lineType === 2 ? 2 : 3;

  ctx.strokeStyle = "#555";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";

  const convergeY = cy - span * 0.9; // 汇聚点

  ctx.beginPath();
  for (let i = 0; i < linePoints; i++) {
    const offset = ((i - (linePoints - 1) / 2) * span * 0.2);
    const startX = cx + offset;
    const startY = cy - span * 0.25;

    if (i === 0) {
      ctx.moveTo(startX, startY);
    } else {
      ctx.moveTo(startX, startY);
    }
    ctx.lineTo(cx, convergeY); // 所有线汇聚到顶部中心
  }
  ctx.stroke();
}

// 江湖称号生成
function generateKiteTitle(params: KiteParams, lift: number, stability: number) {
  const highLift = lift > 250;
  const lowLift = lift <= 150;
  const highStability = stability >= 0.5;
  const lowStability = stability < 0.3;

  if (params.shape === "dragon" && params.colorTheme === "gold-red") return "金龙腾空";
  if (params.shape === "swallow" && params.colorTheme === "blue-white") return "春燕归巢";
  if (params.shape === "butterfly" && params.colorTheme === "purple-pink") return "蝶舞翩跹";
  if (params.colorTheme === "porcelain") return "青花雅韵";
  if (params.colorTheme === "dunhuang") return "敦煌飞仙";

  if (highLift && highStability) return "御风神鸢";
  if (highLift && lowStability) return "狂野小旋风";
  if (lowLift && highStability) return "稳如泰山";
  if (lowLift && lowStability) return "风中残烛";

  return "纸鸢新手";
}

// 缓动函数
function easeOutQuad(t: number) {
  return t * (2 - t);
}

function KiteDesigner() {
  const router = useRouter();
  const search = useSearch({ from: "/workshop_/designer" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState<KiteParams>({
    span: search.span,
    tail: search.tail,
    lineType: (search.line as 1 | 2 | 3) || 2,
    shape: search.shape,
    material: search.material,
    colorTheme: search.colorTheme,
    pattern: search.pattern,
  });
  const [animatingParams, setAnimatingParams] = useState<KiteParams | null>(null);
  const [animation, setAnimation] = useState<"stable" | "spin" | "crash" | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [flightPhase, setFlightPhase] = useState<"takeoff" | "flying" | "landing" | null>(null);
  const [kitePosition, setKitePosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [showFlightOverlay, setShowFlightOverlay] = useState(false);
  const [windAngle, setWindAngle] = useState(0);
  const [flightSuccess, setFlightSuccess] = useState<boolean | null>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; life: number }>>([]);
  const [paletteAnimating, setPaletteAnimating] = useState<string | null>(null);
  const [testFlown, setTestFlown] = useState(false);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  // 计算物理参数
  const lift = params.span * 3;
  const stability = params.tail / params.span;
  const isUnstable = stability < 0.3;
  const windSpeed = "3级";

  // 判断是否失败
  const isFailed = isUnstable || (params.lineType === 1 && params.span > 100);

  // Canvas 绘制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    let animationId: number;
    const animate = () => {
      drawKite(ctx, params, rect.width, rect.height, animation || undefined, kitePosition, Date.now());
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, [params, animation, kitePosition]);

  // LocalStorage 草稿保存
  useEffect(() => {
    localStorage.setItem("kite-design-params", JSON.stringify(params));
    localStorage.setItem("kite-design-timestamp", Date.now().toString());
  }, [params]);

  // 试飞动画
  useEffect(() => {
    if (!isFlying) {
      setAnimation(null);
      setFlightPhase(null);
      setKitePosition({ x: 0, y: 0, rotation: 0 });
      return;
    }

    setShowFlightOverlay(true);
    const startTime = Date.now();
    const duration = 5000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (isFailed) {
        if (progress < 0.3) {
          setFlightPhase("takeoff");
          const t = progress / 0.3;
          setKitePosition({
            x: Math.sin(t * Math.PI) * 20,
            y: -t * 80,
            rotation: Math.sin(t * Math.PI * 2) * 0.1,
          });
        } else if (progress < 0.6) {
          setFlightPhase("flying");
          const t = (progress - 0.3) / 0.3;
          setKitePosition({
            x: Math.sin(t * Math.PI * 4) * 40,
            y: -80 + t * 30,
            rotation: Math.sin(t * Math.PI * 6) * 0.3,
          });
        } else {
          setFlightPhase("landing");
          const t = (progress - 0.6) / 0.4;
          setKitePosition({
            x: Math.sin(t * Math.PI) * 20,
            y: -50 + t * 150,
            rotation: t * 0.8,
          });
          setAnimation("crash");
        }
      } else {
        if (progress < 0.2) {
          setFlightPhase("takeoff");
          const t = progress / 0.2;
          setKitePosition({
            x: Math.sin(t * Math.PI) * 15,
            y: -t * 100,
            rotation: Math.sin(t * Math.PI * 2) * 0.05,
          });
        } else if (progress < 0.8) {
          setFlightPhase("flying");
          const t = (progress - 0.2) / 0.6;
          setKitePosition({
            x: Math.sin(t * Math.PI * 2) * 30 + Math.cos(t * Math.PI * 3) * 10,
            y: -100 + Math.sin(t * Math.PI * 4) * 15,
            rotation: Math.sin(t * Math.PI * 2) * 0.15,
          });
          setAnimation("stable");
        } else {
          setFlightPhase("landing");
          const t = (progress - 0.8) / 0.2;
          setKitePosition({
            x: Math.sin(t * Math.PI) * 20 * (1 - t),
            y: -100 + t * 100,
            rotation: Math.sin(t * Math.PI) * 0.1 * (1 - t),
          });
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsFlying(false);
        setAnimation(null);
        setFlightPhase(null);
        setKitePosition({ x: 0, y: 0, rotation: 0 });
        setTestFlown(true);
        setFlightSuccess(!isFailed);
        
        // 成功时生成粒子
        if (!isFailed) {
          const newParticles = Array.from({ length: 50 }, () => ({
            x: Math.random() * window.innerWidth,
            y: -20,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 3 + 2,
            life: 1,
          }));
          setParticles(newParticles);
        }
        
        setTimeout(() => setShowFlightOverlay(false), 1000);
      }
    };

    requestAnimationFrame(animate);
  }, [isFlying, isFailed]);

  // 粒子动画
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles.length]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `my-kite-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    setSaveConfirmed(true);
    setTimeout(() => setSaveConfirmed(false), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?span=${params.span}&tail=${params.tail}&line=${params.lineType}&shape=${params.shape}&material=${params.material}&colorTheme=${params.colorTheme}&pattern=${params.pattern}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("分享链接已复制到剪贴板！");
    });
  };

  const handleRandomize = () => {
    const shapes: KiteShape[] = ["diamond", "swallow", "butterfly", "dragon"];
    const materials: KiteMaterial[] = ["paper", "silk", "cloth"];
    const themes: ColorTheme[] = ["red-green", "blue-white", "gold-red", "purple-pink", "porcelain", "dunhuang"];
    const patterns: Pattern[] = ["none", "cloud", "flower", "geometric"];

    setParams({
      span: Math.floor(Math.random() * 80) + 40,
      tail: Math.floor(Math.random() * 100),
      lineType: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      material: materials[Math.floor(Math.random() * materials.length)],
      colorTheme: themes[Math.floor(Math.random() * themes.length)],
      pattern: patterns[Math.floor(Math.random() * patterns.length)],
    });
  };

  const title = generateKiteTitle(params, lift, stability);

  return (
    <PageLayout>
      {/* 试飞全屏覆盖层 */}
      {showFlightOverlay && (
        <div className="flight-overlay">
          {/* 天空背景渐变已在CSS中定义 */}

          {/* 白云 */}
          <div className="cloud" style={{ width: 80, height: 30, top: '15%', left: '10%' }}>
            <div style={{ position: 'absolute', width: 40, height: 20, background: 'white', borderRadius: '50%', top: -10, left: 10 }} />
            <div style={{ position: 'absolute', width: 50, height: 25, background: 'white', borderRadius: '50%', top: -15, right: 10 }} />
          </div>
          <div className="cloud" style={{ width: 60, height: 25, top: '25%', right: '15%' }}>
            <div style={{ position: 'absolute', width: 35, height: 18, background: 'white', borderRadius: '50%', top: -8, left: 8 }} />
            <div style={{ position: 'absolute', width: 40, height: 20, background: 'white', borderRadius: '50%', top: -12, right: 5 }} />
          </div>
          <div className="cloud" style={{ width: 70, height: 28, top: '40%', left: '60%' }}>
            <div style={{ position: 'absolute', width: 38, height: 19, background: 'white', borderRadius: '50%', top: -9, left: 12 }} />
            <div style={{ position: 'absolute', width: 45, height: 22, background: 'white', borderRadius: '50%', top: -13, right: 8 }} />
          </div>

          {/* 飞鸟 */}
          <div className="bird" style={{ top: '20%', left: '25%' }} />
          <div className="bird" style={{ top: '30%', right: '30%' }} />
          <div className="bird" style={{ top: '45%', left: '70%' }} />

          {/* 风筝动画 */}
          <div
            className="absolute transition-transform duration-100"
            style={{
              left: '50%',
              top: '45%',
              transform: `translate(-50%, ${kitePosition.y}px) translateX(${kitePosition.x}px) rotate(${kitePosition.rotation}rad)`,
              width: 200,
              height: 260,
            }}
          >
            <canvas
              ref={(canvas) => {
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                canvas.width = 400;
                canvas.height = 520;
                ctx.scale(2, 2);
                drawKite(ctx, params, 200, 260, animation || undefined, { x: 0, y: 0, rotation: 0 }, Date.now());
              }}
              className="w-full h-full"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* 飞行阶段提示 */}
          {flightPhase && (
            <div className="absolute bottom-20 left-0 right-0 text-center">
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <p className="text-base font-medium text-foreground">
                  {flightPhase === "takeoff" && " 起飞中..."}
                  {flightPhase === "flying" && "✈️ 平稳飞行中"}
                  {flightPhase === "landing" && "🪂 降落中..."}
                </p>
              </div>
            </div>
          )}

          {/* 粒子特效 */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="golden-particle absolute"
              style={{
                left: p.x,
                top: p.y,
                opacity: p.life,
                transform: `rotate(${p.life * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* 返回按钮 */}
      <button
        onClick={() => router.history.back()}
        className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition-all mb-4 group"
      >
        <ArrowLeft size={20} className="text-foreground group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-sm font-medium text-foreground">返回</span>
      </button>

      {/* Canvas 画布 */}
      <div className="mb-6 reveal">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden relative">
          <canvas
            ref={canvasRef}
            className="w-full h-64 sm:h-80 kite-float"
            style={{ imageRendering: "crisp-edges" }}
          />
          
          {/* 粒子特效层 */}
          {particles.map((p, i) => (
            <div
              key={i}
              className="golden-particle absolute"
              style={{
                left: p.x,
                top: p.y,
                opacity: p.life,
                transform: `rotate(${p.life * 360}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 随机组合按钮 */}
      <div className="mb-4 reveal">
        <Button
          onClick={handleRandomize}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Dice5 size={18} />
          <span>随机组合</span>
        </Button>
      </div>

      {/* 参数控制区 */}
      <div className="space-y-4 mb-6">
        {/* 骨架形状 - 横向滑动卡片 */}
        <div className="reveal">
          <label className="text-sm font-medium text-foreground mb-2 block">
            骨架形状
          </label>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[
              { value: "diamond", label: "菱形", icon: "◇" },
              { value: "swallow", label: "圆形", icon: "🕊" },
              { value: "butterfly", label: "爱心", icon: "🦋" },
              { value: "dragon", label: "叶型", icon: "🍃" },
            ].map((shape) => (
              <button
                key={shape.value}
                onClick={() => setParams((p) => ({ ...p, shape: shape.value as KiteShape }))}
                className={`shrink-0 w-20 py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                  params.shape === shape.value
                    ? "shape-card-selected bg-teal/10 border-2 border-teal text-teal"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-transparent"
                }`}
              >
                <div className="text-2xl mb-1">{shape.icon}</div>
                <div>{shape.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 蒙面材质 */}
        <div className="reveal">
          <label className="text-sm font-medium text-foreground mb-2 block">
            蒙面材质
          </label>
          <div className="flex gap-2">
            {[
              { value: "paper", label: "纸" },
              { value: "silk", label: "绢" },
              { value: "cloth", label: "布" },
            ].map((material) => (
              <button
                key={material.value}
                onClick={() => setParams((p) => ({ ...p, material: material.value as KiteMaterial }))}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  params.material === material.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {material.label}
              </button>
            ))}
          </div>
        </div>

        {/* 颜色主题 - 调色盘样式 */}
        <div className="reveal">
          <label className="text-sm font-medium text-foreground mb-2 block">
            配色方案
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "red-green", label: "朱红翠绿", gradientStart: "#E86B5A", gradientEnd: "#C23B22" },
              { value: "blue-white", label: "靛蓝月白", gradientStart: "#5B8DB8", gradientEnd: "#1A4F7A" },
              { value: "gold-red", label: "紫藤金", gradientStart: "#C8A8D0", gradientEnd: "#9B7E9E" },
              { value: "purple-pink", label: "墨黑朱砂", gradientStart: "#5A5A5A", gradientEnd: "#2C2C2C" },
              { value: "porcelain", label: "青花瓷", gradientStart: "#4A9E7A", gradientEnd: "#1E3A5F" },
              { value: "dunhuang", label: "敦煌彩", gradientStart: "#E8C07A", gradientEnd: "#D4A54A" },
            ].map((theme) => (
              <button
                key={theme.value}
                onClick={() => {
                  setParams((p) => ({ ...p, colorTheme: theme.value as ColorTheme }));
                  setPaletteAnimating(theme.value);
                  setTimeout(() => setPaletteAnimating(null), 400);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1.5 ${
                  params.colorTheme === theme.value
                    ? "bg-primary/10 border-2 border-teal"
                    : "bg-muted hover:bg-muted/80 border-2 border-transparent"
                }`}
              >
                <div className={`flex items-center relative ${paletteAnimating === theme.value ? 'palette-ripple' : ''}`}>
                  <div
                    className="w-6 h-6 rounded-full border border-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${theme.gradientStart}, ${theme.gradientEnd})`, zIndex: 2, position: 'relative' }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white shadow-sm -ml-2"
                    style={{ background: `linear-gradient(135deg, ${theme.gradientEnd}, ${theme.gradientStart})`, zIndex: 1, position: 'relative' }}
                  />
                </div>
                <span className="text-[10px]">{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 装饰图案 */}
        <div className="reveal">
          <label className="text-sm font-medium text-foreground mb-2 block">
            装饰纹样
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "none", label: "无" },
              { value: "cloud", label: "云纹" },
              { value: "flower", label: "花卉" },
              { value: "geometric", label: "几何" },
            ].map((pattern) => (
              <button
                key={pattern.value}
                onClick={() => setParams((p) => ({ ...p, pattern: pattern.value as Pattern }))}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  params.pattern === pattern.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>

        {/* 翼展滑块 - 竹篾纹理 */}
        <div className="reveal">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">翼展</label>
            <span className="text-sm font-bold text-bamboo">{params.span}</span>
          </div>
          <Slider
            value={[params.span]}
            min={40}
            max={120}
            step={1}
            onValueChange={([value]) => setParams((p) => ({ ...p, span: value }))}
            className="bamboo-track [&_[role=slider]]:spool-thumb"
          />
        </div>

        {/* 尾长滑块 */}
        <div className="reveal">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">尾长</label>
            <span className="text-sm font-bold text-bamboo">{params.tail}</span>
          </div>
          <Slider
            value={[params.tail]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => setParams((p) => ({ ...p, tail: value }))}
            className="bamboo-track [&_[role=slider]]:spool-thumb"
          />
        </div>

        {/* 提线方式 */}
        <div className="reveal">
          <label className="text-sm font-medium text-foreground mb-2 block">
            提线方式
          </label>
          <div className="flex gap-2">
            {[1, 2, 3].map((type) => (
              <button
                key={type}
                onClick={() => setParams((p) => ({ ...p, lineType: type as 1 | 2 | 3 }))}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  params.lineType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}点
              </button>
            ))}
          </div>
        </div>

        {/* 实时数值显示 - 美化卡片 */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-4 reveal">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center bg-teal/10 rounded-xl p-3">
              <WindIcon className="mx-auto mb-1 text-teal" size={20} />
              <p className="text-xs text-muted-foreground">升力值</p>
              <p className="text-lg font-bold text-foreground">{lift}</p>
            </div>
            <div className="text-center bg-muted rounded-xl p-3">
              <p className="text-xs text-muted-foreground">稳定性</p>
              <p className={`text-lg font-bold ${isUnstable ? "text-destructive" : "text-secondary"}`}>
                {stability.toFixed(2)}
              </p>
            </div>
            <div className="text-center bg-bamboo/10 rounded-xl p-3">
              <p className="text-xs text-muted-foreground">适飞风力</p>
              <p className="text-lg font-bold text-bamboo">{windSpeed}</p>
            </div>
          </div>
          {isUnstable && (
            <p className="text-xs text-destructive mt-3 text-center">
              ⚠️ 稳定性不足，容易打转
            </p>
          )}
        </div>
      </div>

      {/* 江湖称号 */}
      {testFlown && (
        <div className="mb-6 text-center reveal">
          <h3 className="kite-title text-2xl font-serif font-bold text-bamboo mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">你的专属风筝诞生了，快去分享吧！</p>
        </div>
      )}

      {/* 飞行状态提示 */}
      {flightPhase && (
        <div className="mb-4 p-3 bg-muted rounded-lg reveal">
          <p className="text-sm text-center font-medium">
            {flightPhase === "takeoff" && "🚀 起飞中..."}
            {flightPhase === "flying" && "✈️ 平稳飞行中"}
            {flightPhase === "landing" && "🪂 降落中..."}
          </p>
        </div>
      )}

      {/* 试飞按钮 */}
      <div className="mb-6 reveal">
        <Button
          onClick={() => setIsFlying(true)}
          disabled={isFlying}
          className="w-full breathe-glow bg-primary hover:bg-primary/90 h-14 text-base"
          size="lg"
        >
          <Play className="mr-2" size={20} />
          {isFlying ? "飞行中..." : "试飞"}
        </Button>
      </div>

      {/* 失败提示 */}
      {isFailed && !isFlying && testFlown && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl reveal shake">
          <p className="text-sm text-destructive text-center font-medium">
            哎呀，翻跟头了，试试加长尾巴？
          </p>
        </div>
      )}

      {/* 底部操作按钮 */}
      <div className="flex gap-3 reveal">
        <Button 
          onClick={handleSave} 
          variant="outline" 
          className="flex-1"
          disabled={!testFlown}
        >
          {saveConfirmed ? (
            <>
              <Check className="mr-2" size={18} />
              已保存
            </>
          ) : (
            <>
              <Save className="mr-2" size={18} />
              保存设计图
            </>
          )}
        </Button>
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="flex-1"
          disabled={!testFlown}
        >
          <Share2 className="mr-2" size={18} />
          分享
        </Button>
      </div>

      {/* 试飞成功提示 */}
      {testFlown && !isFailed && (
        <p className="text-center text-sm text-vermilion mt-4 reveal">
          你的专属风筝诞生了，快去分享吧！
        </p>
      )}
    </PageLayout>
  );
}
