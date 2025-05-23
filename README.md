# 🌟 Gerador de Histórias Mágicas para Theo

> **Um aplicativo PWA que cria histórias personalizadas para crianças com ilustrações de IA em tempo real**

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MClay83/gerador-historias-magicas-theo)

## ✨ **Características Principais**

- 🎨 **Histórias personalizadas** geradas com Google Gemini AI
- 🖼️ **Imagens reais de IA** usando Hugging Face Stable Diffusion
- 🎭 **Sistema híbrido inteligente**: API primeiro, SVG contextual como fallback
- 📱 **PWA completo** - instalável como app nativo no celular
- 💾 **Download em PDF** das histórias criadas
- 🎯 **Feito especialmente para crianças de 6 anos**
- 🌈 **Interface linda e responsiva** com Tailwind CSS

## 🚀 **Demo Online**

Acesse: [https://gerador-historias-magicas-theo.vercel.app](https://gerador-historias-magicas-theo.vercel.app)

No celular: **"Adicionar à Tela Inicial"** para instalar como app!

## 📱 **Funcionamento**

1. **Escolha os elementos**: Herói, lugar, aventura e desfecho
2. **IA cria a história**: Google Gemini gera 6-7 páginas personalizadas
3. **Ilustrações automáticas**: Stable Diffusion cria imagens temáticas
4. **Resultado incrível**: História completa com ilustrações contextuais

## 🛠️ **Tecnologias**

### **Frontend**
- ⚛️ **React 19** + TypeScript
- ⚡ **Vite** para build ultrarrápido
- 🎨 **Tailwind CSS** para estilização
- 📱 **PWA** com Service Worker

### **IA & Backend**
- 🧠 **Google Gemini AI** para geração de texto
- 🎭 **Hugging Face** Stable Diffusion para imagens
- 🔄 **Sistema híbrido** com fallback SVG contextual
- 💾 **jsPDF** para export de histórias

### **Deploy & Mobile**
- 🚀 **Vercel** para hospedagem
- 📱 **PWA instalável** em iOS/Android
- 🔄 **Cache offline** inteligente

## ⚙️ **Configuração Local**

### **1. Clone o repositório**
```bash
git clone https://github.com/MClay83/gerador-historias-magicas-theo.git
cd gerador-historias-magicas-theo
```

### **2. Instale dependências**
```bash
pnpm install
# ou
npm install
```

### **3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz:

```env
VITE_API_KEY=sua_chave_google_gemini_aqui
VITE_HUGGINGFACE_TOKEN=seu_token_write_huggingface_aqui
```

#### **🔑 Como obter as chaves:**

**Google Gemini API:**
1. Acesse [Google AI Studio](https://aistudio.google.com/)
2. Faça login com sua conta Google
3. Clique em "Get API Key"
4. Copie a chave gerada

**Hugging Face (Token Write):**
1. Acesse [Hugging Face](https://huggingface.co/)
2. Crie uma conta ou faça login
3. Vá em Settings → Access Tokens
4. Clique em "New token"
5. **IMPORTANTE**: Selecione "Write" (não "Read")
6. Copie o token gerado

### **4. Execute o projeto**
```bash
pnpm run dev
# ou
npm run dev
```

Acesse: `http://localhost:5173`

## 📱 **Deploy para Mobile**

### **🌟 Opção 1: Deploy no Vercel (RECOMENDADO)**

1. **Fork este repositório**
2. **Acesse [Vercel.com](https://vercel.com)**
3. **Importe seu fork**
4. **Configure as variáveis de ambiente**:
   - `VITE_API_KEY`
   - `VITE_HUGGINGFACE_TOKEN`
5. **Deploy automático!**

### **📱 Instalar no Celular**

1. **Abra a URL do Vercel no celular**
2. **Android**: Menu → "Instalar aplicativo"
3. **iPhone**: Compartilhar → "Adicionar à Tela Inicial"

## 🎨 **Sistema de Imagens Híbrido**

### **🤖 Imagens de IA (Primeira tentativa)**
- **Stable Diffusion XL** via Hugging Face
- **Fallback automático** para outros modelos
- **Prompts otimizados** para estilo cartoon infantil

### **🎭 SVG Contextual (Fallback inteligente)**
- **Análise do contexto** da história
- **Elementos temáticos**: floresta → árvores, castelo → torres, etc.
- **Cores dinâmicas** baseadas no ambiente
- **Sempre funciona** mesmo offline

### **🔄 Fluxo Inteligente**
```
História criada → Tenta API real → Sucesso? ✅ Usa imagem AI
                                 → Falha? ⚡ Gera SVG contextual
```

## 🎯 **Funcionalidades Especiais**

### **👶 Otimizado para Crianças**
- ✅ Linguagem adequada (6 anos)
- ✅ Temas sempre positivos
- ✅ Personagens consistentes
- ✅ Interface intuitiva

### **📱 PWA Completo**
- ✅ Instalação nativa
- ✅ Funciona offline
- ✅ Cache inteligente
- ✅ Ícones e splash screen

### **🎨 Responsivo Total**
- ✅ Desktop, tablet, mobile
- ✅ Touch-friendly
- ✅ Orientação portrait otimizada

## 🔧 **Scripts Disponíveis**

```bash
pnpm run dev      # Servidor de desenvolvimento
pnpm run build    # Build para produção
pnpm run preview  # Preview do build
```

## 🤝 **Contribuindo**

1. **Fork o projeto**
2. **Crie uma branch**: `git checkout -b feature/nova-funcionalidade`
3. **Commit suas mudanças**: `git commit -m 'Adiciona nova funcionalidade'`
4. **Push para a branch**: `git push origin feature/nova-funcionalidade`
5. **Abra um Pull Request**

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🌟 **Créditos**

Feito com ❤️ para pequenos sonhadores como o Theo!

- **IA**: Google Gemini + Hugging Face
- **Frontend**: React + TypeScript + Vite
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel

---

### 🎉 **Resultado Final**

**Uma experiência mágica que combina tecnologia de ponta com criatividade infantil, gerando histórias únicas e ilustrações contextuais para criar momentos especiais de leitura!**

**⭐ Se gostou do projeto, deixe uma estrela!**