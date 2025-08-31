#!/usr/bin/env node

/**
 * Script de Validação CSS
 * Verifica estrutura CSS e melhores práticas
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Iniciando validação CSS...\n');

const cssFiles = [
    'assets/css/critical.css',
    'assets/css/styles.css'
];

let totalPassed = 0;
let totalFailed = 0;

cssFiles.forEach(cssFile => {
    const filePath = path.join(__dirname, '..', cssFile);
    
    console.log(`📁 Validando: ${cssFile}`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Arquivo não encontrado: ${cssFile}`);
        return;
    }

    const cssContent = fs.readFileSync(filePath, 'utf8');
    
    const validations = [
        {
            name: 'Reset CSS presente',
            test: () => cssContent.includes('margin: 0') && cssContent.includes('padding: 0'),
            file: cssFile
        },
        {
            name: 'Box-sizing definido',
            test: () => cssContent.includes('box-sizing'),
            file: cssFile
        },
        {
            name: 'Responsividade (media queries)',
            test: () => cssContent.includes('@media'),
            file: cssFile
        },
        {
            name: 'Variáveis CSS ou cores consistentes',
            test: () => cssContent.includes(':root') || cssContent.includes('var(--') || /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/.test(cssContent),
            file: cssFile
        },
        {
            name: 'Flexbox ou Grid',
            test: () => cssContent.includes('display: flex') || cssContent.includes('display: grid'),
            file: cssFile
        },
        {
            name: 'Transitions/Animations',
            test: () => cssContent.includes('transition') || cssContent.includes('@keyframes'),
            file: cssFile
        }
    ];

    let passed = 0;
    let failed = 0;

    validations.forEach(validation => {
        const result = validation.test();
        
        if (result) {
            console.log(`  ✅ ${validation.name}`);
            passed++;
        } else {
            console.log(`  ❌ ${validation.name}`);
            failed++;
        }
    });

    console.log(`  📊 ${passed}/${validations.length} validações passaram\n`);
    
    totalPassed += passed;
    totalFailed += failed;
});

console.log('📈 Resumo Geral CSS:');
console.log(`✅ Total passou: ${totalPassed}`);
console.log(`❌ Total falhou: ${totalFailed}`);

if (totalFailed === 0) {
    console.log('\n✅ Validação CSS PASSOU!');
    process.exit(0);
} else {
    console.log('\n⚠️  Validação CSS com avisos. Considere as melhorias sugeridas.');
    process.exit(0); // Não falhar o build por recomendações CSS
}
