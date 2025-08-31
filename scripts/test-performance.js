#!/usr/bin/env node

/**
 * Script de Teste de Performance
 * Simula testes básicos de performance
 */

const fs = require('fs');
const path = require('path');

console.log('⚡ Iniciando testes de performance...\n');

// Verificar tamanhos de arquivos
const files = [
    { path: 'index.html', maxSize: 100, unit: 'KB' },
    { path: 'assets/css/critical.css', maxSize: 20, unit: 'KB' },
    { path: 'assets/css/styles.css', maxSize: 50, unit: 'KB' },
    { path: 'assets/js/main.js', maxSize: 100, unit: 'KB' },
    { path: 'assets/js/seo-analytics.js', maxSize: 30, unit: 'KB' }
];

let performanceScore = 100;
let issues = [];

console.log('📁 Analisando tamanhos de arquivos:');

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file.path);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file.path} - Arquivo não encontrado`);
        return;
    }

    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;
    
    if (sizeKB <= file.maxSize) {
        console.log(`✅ ${file.path} - ${sizeKB.toFixed(2)} KB (limite: ${file.maxSize} KB)`);
    } else {
        console.log(`❌ ${file.path} - ${sizeKB.toFixed(2)} KB (EXCEDE limite: ${file.maxSize} KB)`);
        performanceScore -= 10;
        issues.push(`${file.path} muito grande: ${sizeKB.toFixed(2)} KB`);
    }
});

// Verificar otimizações HTML
console.log('\n🔍 Verificando otimizações HTML:');

const htmlPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    const optimizations = [
        {
            name: 'Preconnect para recursos externos',
            test: () => htmlContent.includes('rel="preconnect"'),
            weight: 5
        },
        {
            name: 'CSS crítico inline',
            test: () => htmlContent.includes('<style>'),
            weight: 10
        },
        {
            name: 'Scripts com defer/async',
            test: () => htmlContent.includes('defer') || htmlContent.includes('async'),
            weight: 10
        },
        {
            name: 'Lazy loading configurado',
            test: () => htmlContent.includes('loading="lazy"') || htmlContent.includes('data-src'),
            weight: 5
        },
        {
            name: 'Manifest PWA',
            test: () => htmlContent.includes('rel="manifest"'),
            weight: 5
        }
    ];

    optimizations.forEach(opt => {
        if (opt.test()) {
            console.log(`✅ ${opt.name}`);
        } else {
            console.log(`❌ ${opt.name}`);
            performanceScore -= opt.weight;
            issues.push(`Otimização ausente: ${opt.name}`);
        }
    });
}

// Verificar CSS crítico
console.log('\n🎨 Verificando CSS crítico:');

const criticalPath = path.join(__dirname, '..', 'assets', 'css', 'critical.css');
if (fs.existsSync(criticalPath)) {
    const criticalContent = fs.readFileSync(criticalPath, 'utf8');
    
    if (criticalContent.includes('above-the-fold') || criticalContent.includes('hero') || criticalContent.includes('header')) {
        console.log('✅ CSS crítico configurado corretamente');
    } else {
        console.log('⚠️  CSS crítico pode precisar de ajustes');
        performanceScore -= 5;
    }
} else {
    console.log('❌ CSS crítico não encontrado');
    performanceScore -= 15;
    issues.push('CSS crítico ausente');
}

// Calcular score final
console.log('\n📊 Score de Performance:');
console.log(`🎯 Score: ${Math.max(0, performanceScore)}/100`);

if (performanceScore >= 90) {
    console.log('🏆 EXCELENTE - Performance otimizada!');
} else if (performanceScore >= 70) {
    console.log('✅ BOM - Performance adequada');
} else if (performanceScore >= 50) {
    console.log('⚠️  REGULAR - Algumas otimizações necessárias');
} else {
    console.log('❌ RUIM - Muitas otimizações necessárias');
}

if (issues.length > 0) {
    console.log('\n🔧 Sugestões de melhoria:');
    issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
    });
}

console.log('\n✅ Teste de performance concluído!');
process.exit(0);
