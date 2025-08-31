#!/usr/bin/env node

/**
 * Script de Validação HTML
 * Verifica a estrutura HTML e tags essenciais
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Iniciando validação HTML...\n');

const htmlFile = path.join(__dirname, '..', 'index.html');

if (!fs.existsSync(htmlFile)) {
    console.error('❌ Arquivo index.html não encontrado!');
    process.exit(1);
}

const htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Testes de validação
const validations = [
    {
        name: 'DOCTYPE declarado',
        test: () => htmlContent.includes('<!DOCTYPE html>'),
        required: true
    },
    {
        name: 'Meta charset UTF-8',
        test: () => htmlContent.includes('charset="UTF-8"'),
        required: true
    },
    {
        name: 'Meta viewport',
        test: () => htmlContent.includes('name="viewport"'),
        required: true
    },
    {
        name: 'Tag title',
        test: () => /<title>.*<\/title>/.test(htmlContent),
        required: true
    },
    {
        name: 'Meta description',
        test: () => htmlContent.includes('name="description"'),
        required: true
    },
    {
        name: 'Open Graph tags',
        test: () => htmlContent.includes('property="og:'),
        required: false
    },
    {
        name: 'Structured data (Schema)',
        test: () => htmlContent.includes('application/ld+json'),
        required: false
    },
    {
        name: 'Favicon',
        test: () => htmlContent.includes('rel="icon"'),
        required: false
    },
    {
        name: 'CSS crítico inline',
        test: () => htmlContent.includes('<style>'),
        required: false
    },
    {
        name: 'Scripts com defer/async',
        test: () => htmlContent.includes('defer') || htmlContent.includes('async'),
        required: false
    }
];

let passed = 0;
let failed = 0;
let warnings = 0;

validations.forEach(validation => {
    const result = validation.test();
    
    if (result) {
        console.log(`✅ ${validation.name}`);
        passed++;
    } else {
        if (validation.required) {
            console.log(`❌ ${validation.name} (OBRIGATÓRIO)`);
            failed++;
        } else {
            console.log(`⚠️  ${validation.name} (RECOMENDADO)`);
            warnings++;
        }
    }
});

// Verificações adicionais
console.log('\n📊 Estatísticas:');
console.log(`- Tamanho do arquivo: ${(fs.statSync(htmlFile).size / 1024).toFixed(2)} KB`);
console.log(`- Linhas de código: ${htmlContent.split('\n').length}`);

// Resumo
console.log('\n📈 Resumo da Validação:');
console.log(`✅ Passou: ${passed}`);
console.log(`❌ Falhou: ${failed}`);
console.log(`⚠️  Avisos: ${warnings}`);

if (failed > 0) {
    console.log('\n❌ Validação HTML FALHOU! Corrija os erros obrigatórios.');
    process.exit(1);
} else {
    console.log('\n✅ Validação HTML PASSOU!');
    if (warnings > 0) {
        console.log(`💡 Considere implementar as ${warnings} recomendações para melhor SEO/Performance.`);
    }
    process.exit(0);
}
