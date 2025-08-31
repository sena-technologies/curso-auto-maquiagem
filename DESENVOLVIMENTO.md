# Configuração de Desenvolvimento - Curso Auto Maquiagem

## Scripts de Desenvolvimento

### Iniciar servidor local (Python)
```bash
python -m http.server 3000
```

### Iniciar servidor local (Node.js - se tiver instalado)
```bash
npx http-server -p 3000 -c-1
```

### Live Server (VS Code Extension)
- Instale a extensão "Live Server"
- Clique com botão direito no index.html
- Selecione "Open with Live Server"

## Estrutura de Arquivos Organizada

```
projeto/
├── assets/
│   ├── css/
│   │   ├── critical.css    # CSS crítico (above-the-fold)
│   │   └── styles.css      # CSS principal
│   ├── js/
│   │   ├── main.js         # JavaScript principal
│   │   └── seo-analytics.js # Analytics e SEO
│   └── images/             # Imagens do projeto
├── index.html              # Página principal
├── .htaccess              # Configurações Apache
├── robots.txt             # SEO
├── sitemap.xml            # Sitemap
├── site.webmanifest       # PWA
├── package.json           # Configurações do projeto
├── README.md              # Documentação
└── LICENSE                # Licença MIT

```

## Comandos Úteis

### Git
```bash
# Inicializar
git init
git remote add origin https://github.com/sena-technologies/curso-auto-maquiagem.git

# Commit inicial
git add .
git commit -m "feat: setup inicial do projeto"
git push -u origin main

# Workflow desenvolvimento
git checkout -b feature/nova-funcionalidade
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
```

### Validação HTML
- Usar: https://validator.w3.org/
- Ou instalar: npm install -g html-validate

### Teste de Performance
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

### Teste de SEO
- Google Search Console
- SEMrush
- Ahrefs
- Screaming Frog

## URLs Importantes

- **Desenvolvimento**: http://localhost:3000
- **Produção**: https://sena-technologies.github.io/curso-auto-maquiagem
- **Repository**: https://github.com/sena-technologies/curso-auto-maquiagem

## Checklist de Deploy

- [ ] Testar em diferentes navegadores
- [ ] Verificar responsividade
- [ ] Validar HTML/CSS
- [ ] Otimizar imagens
- [ ] Testar performance
- [ ] Verificar SEO
- [ ] Configurar analytics
- [ ] Testar formulários
- [ ] Backup do código
