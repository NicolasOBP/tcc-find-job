# FindJob - Plataforma de Cadastro de CV e Oportunidades de Emprego

## 📋 Descrição do Projeto

**FindJob** é uma plataforma web desenvolvida em **React** que conecta estudantes, professores e empresas em um único ecossistema para facilitar a inserção de talentos no mercado de trabalho.

O projeto funciona como um intermediário inteligente onde:

- **Candidatos (Alunos)**: Cadastram seus currículos, habilidades e aplicam para vagas de emprego
- **Empresas**: Publicam vagas, visualizam perfis de candidatos e recebem avaliações de professores
- **Professores**: Avaliam seus alunos, adicionam comentários sobre habilidades e competências para ajudar empresas na seleção

A diferença inovadora do FindJob é que empresas não dependem **apenas** do currículo - elas também recebem **avaliações qualitativas de professores** que conhecem os candidatos, reduzindo riscos de contratação e valorizando aspectos que currículos tradicionais não capturam.

---

## 🎯 Funcionalidades Principais

### Para Candidatos (Alunos)

- ✅ **Cadastro de Perfil**: Registro com informações pessoais e profissionais
- ✅ **Construtor de Currículo**: Interface intuitiva para montar e personalizar CV
- ✅ **Busca e Filtro de Vagas**: Encontrar oportunidades por área de interesse
- ✅ **Aplicação em Vagas**: Candidatar-se a posições disponíveis
- ✅ **Visualização de Feedback**: Ver comentários e avaliações de professores
- ✅ **Histórico de Candidaturas**: Acompanhar vagas em que se candidatou

### Para Empresas

- ✅ **Cadastro Empresarial**: Registrar informações da empresa
- ✅ **Publicação de Vagas**: Criar vagas com detalhes completos
  - Título da vaga
  - Descrição e responsabilidades
  - Requisitos técnicos
  - Benefícios e salário
  - Localização e modelo (presencial/remoto/híbrido)
  - Carga horária
- ✅ **Visualização de Candidatos**: Ver perfis de quem se candidatou
- ✅ **Avaliações de Professores**: Acessar comentários qualitativos de professores sobre os candidatos
- ✅ **Gerenciamento de Vagas**: Acompanhar vagas publicadas e suas aplicações
- ✅ **Perfil Empresarial**: Editar informações da empresa

### Para Professores

- ✅ **Cadastro de Professor**: Registrar credenciais e instituição
- ✅ **Seleção de Candidatos**: Visualizar lista de alunos disponíveis
- ✅ **Adição de Avaliações**: Adicionar comentários sobre habilidades dos alunos
  - Seleção de habilidades específicas
  - Texto de avaliação qualitativa
  - Sistema de feedback estruturado
- ✅ **Avaliação Contínua**: Atualizar e melhorar avaliações existentes
- ✅ **Perfil do Professor**: Gerenciar informações profissionais

### Gerais

- ✅ **Autenticação Segura**: Login com autenticação Firebase
- ✅ **Três Perfis Distintos**: Interfaces customizadas por tipo de usuário
- ✅ **Sistema de Filtros**: Buscar por área, localização, nível de experiência
- ✅ **Responsividade**: Design adaptável para desktop e tablet

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia            | Versão | Propósito                                                      |
| --------------------- | ------ | -------------------------------------------------------------- |
| **React**             | 18.2.0 | Framework principal para construção da UI                      |
| **React Router DOM**  | 6.14.2 | Roteamento e navegação entre páginas                           |
| **React Bootstrap**   | 2.8.0  | Componentes UI pré-construídos com Bootstrap                   |
| **Tailwind CSS**      | 3.3.3  | Framework CSS utilitário para estilização                      |
| **Material Tailwind** | 2.1.0  | Componentes Material Design com Tailwind                       |
| **Headless UI**       | 1.7.16 | Componentes sem estilo (modals, dropdowns)                     |
| **Hero Icons**        | 2.0.18 | Biblioteca de ícones SVG                                       |
| **React Icons**       | 4.10.1 | Múltiplas bibliotecas de ícones (Bootstrap, Font Awesome, etc) |

### Backend & Autenticação

| Tecnologia           | Versão         | Propósito                                                          |
| -------------------- | -------------- | ------------------------------------------------------------------ |
| **Firebase**         | 10.4.0         | Backend as a Service (autenticação, banco de dados, armazenamento) |
| **FirebaseUI**       | 6.1.0          | Interface pré-construída para autenticação                         |
| **Firestore**        | (via Firebase) | Banco de dados NoSQL em tempo real                                 |
| **Firebase Storage** | (via Firebase) | Armazenamento em nuvem para imagens e documentos                   |
| **Firebase Auth**    | (via Firebase) | Autenticação e gerenciamento de usuários                           |

### Utilitários

| Tecnologia           | Versão  | Propósito                                              |
| -------------------- | ------- | ------------------------------------------------------ |
| **UUID**             | 9.0.0   | Geração de identificadores únicos para recursos        |
| **React Input Mask** | 2.0.4   | Máscara de entrada para CPF, telefone, etc             |
| **FireSQL**          | 2.0.2   | Query builder para Firestore                           |
| **AutoPrefixer**     | 10.4.14 | Adiciona prefixos CSS automáticos para compatibilidade |
| **PostCSS**          | 8.4.27  | Processador CSS para transformações                    |

---

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── navbar.js           # Navbar para candidatos
│   ├── navbarE.js          # Navbar para empresas
│   ├── navbarP.js          # Navbar para professores
│   ├── navbarPortal.js     # Navbar da página inicial
│   ├── vagascards.js       # Card de exibição de vagas
│   ├── cardCandEmpre.js    # Card de candidatos (visualização empresa)
│   ├── cardCandProfessor.js# Card de candidatos (visualização professor)
│   ├── adComentario.js     # Modal para adicionar comentários
│   ├── cadCurriculo.js     # Componente de construção de CV
│   ├── modals.js           # Componentes modais reutilizáveis
│   ├── dropdown.js         # Componente dropdown customizado
│   ├── input.js            # Componentes de input customizados
│   ├── vídeoscurri.js      # Componente de vídeos do currículo
│   ├── suasV.js            # Vagas publicadas pelo usuário
│   ├── atualizaDados.js    # Atualização de dados do perfil
│   ├── nenhumavga.js       # Componente para "nenhuma vaga encontrada"
│   └── [outros componentes]
│
├── context/                 # Context API para estado global
│   └── context.js          # Gerenciador de contexto com dados do usuário
│
├── pages/                   # Páginas da aplicação
│   ├── Login.js            # Página de login
│   ├── SelecCad.js         # Seleção do tipo de cadastro
│   ├── PerfilCandiShowE.js # Visualização de perfil candidato (empresa)
│   ├── PerfilCandiShowP.js # Visualização de perfil candidato (professor)
│   │
│   ├── candidato/          # Páginas específicas do candidato
│   │   ├── CadCandi.js     # Cadastro de candidato
│   │   ├── home.js         # Home/feed de vagas
│   │   ├── MonteCurriculo.js # Construção do CV
│   │   ├── PerfilCandidato.js# Perfil do candidato
│   │   └── VagasApli.js    # Vagas aplicadas
│   │
│   ├── empresa/            # Páginas específicas da empresa
│   │   ├── CadImpre.js     # Cadastro de empresa
│   │   ├── CadVagas.js     # Criação de vagas
│   │   ├── CandidatosEmpre.js# Visualização de candidatos
│   │   ├── PerfilEmpre.js  # Perfil da empresa
│   │   └── SuasV.js        # Vagas publicadas pela empresa
│   │
│   └── professor/          # Páginas específicas do professor
│       ├── CadProfe.js     # Cadastro de professor
│       ├── PerfilProfessor.js# Perfil do professor
│       └── SelecaoCandidato.js# Seleção de candidatos para avaliar
│
├── firebase/
│   └── config.js           # Configuração e inicialização do Firebase
│
├── css/                     # Arquivos de estilo
│   ├── global.css          # Estilos globais
│   ├── seleccad.css        # Estilos da seleção de cadastro
│   └── cardvaga.css        # Estilos dos cards de vaga
│
├── imgs/                    # Imagens estáticas
│
├── App.js                   # Componente raiz da aplicação
├── index.js                 # Ponto de entrada com configuração de rotas
└── index.css               # Estilos base
```

---

## 🏗️ Arquitetura e Padrões Utilizados

### 1. **Context API para Gerenciamento de Estado**

- Centralização de dados globais (dados do usuário, filtros, etc)
- Arquivo principal: `src/context/context.js`
- Dados armazenados em localStorage para persistência

```javascript
// Exemplo de uso
const { dados, setDados, filter, setFilter } = useContext(Dados);
```

### 2. **Firebase como Backend**

- **Autenticação**: Firebase Auth para login/registro
- **Banco de dados**: Firestore para armazenar:
  - `tb05_area` - Áreas de trabalho
  - `tb04_vaga` - Vagas de emprego
  - `tb07_vagasApli` - Aplicações em vagas
  - `tb09_habilidades` - Habilidades cadastradas
  - Coleções de usuários (candidatos, empresas, professores)
- **Storage**: Firebase Storage para upload de imagens/documentos

### 3. **Roteamento com React Router v6**

- Navegação programática com `useNavigate()`
- Rotas organizadas por tipo de usuário
- Proteção de rotas por tipo (verificação de `tipo` do usuário)

### 4. **Separação por Tipo de Usuário**

Cada tipo de usuário (Candidato, Empresa, Professor) tem:

- Navbar customizada
- Páginas específicas
- Permissões diferenciadas
- Interface adaptada

```javascript
// Verificação típica de acesso
const userLocalStorage = JSON.parse(localStorage.getItem("user"));
if (userLocalStorage.tipo == "C") {
  // Acesso permitido para candidatos
}
```

### 5. **Componentes Reutilizáveis**

- **Input Components**: `Input1`, `Input2`, `Input3` com masking
- **Modal Component**: `Modal1` para diálogos
- **Dropdown**: Componente customizado de seleção
- **Cards**: Cards padronizados para diferentes contextos

### 6. **Estilização com Tailwind CSS**

- Utility-first approach para estilos rápidos
- Integração com Material Tailwind para componentes pré-estilizados
- CSS customizado em arquivos específicos quando necessário

### 7. **Tratamento de Dados em Tempo Real**

- Uso de `onSnapshot` do Firestore para atualizações em tempo real
- Filtros dinâmicos com `getDocs` e `query`
- Remoção de duplicatas em arrays

---

## 🔐 Modelo de Dados

### Tipos de Usuário

1. **Candidato** (`tipo = "C"`)
   - CPF, nome, email, telefone
   - Currículo, habilidades, experiência
   - Histórico de aplicações

2. **Empresa** (`tipo = "E"`)
   - CNPJ, razão social, email
   - Vagas publicadas
   - Candidatos em análise

3. **Professor** (`tipo = "P"`)
   - CPF, nome, instituição
   - Alunos avaliados
   - Comentários e habilidades atribuídas

### Estrutura de Vagas

```
{
  tituloV: string,           // Título da vaga
  modeloV: string,           // Presencial/Remoto/Híbrido
  numeroV: number,           // Número de vagas
  benefV: string,            // Benefícios
  sal: number,               // Salário
  localV: string,            // Local
  descV: string,             // Descrição
  areaV: string,             // Área (filtro)
  reqV: string,              // Requisitos
  cargaI: string,            // Carga horária inicial
  cargaF: string,            // Carga horária final
  imageURl: string,          // URL da imagem
  cnpj: string               // CNPJ da empresa
}
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Conta Firebase (configurada com Firestore, Storage e Auth)

### Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd tccfj
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o Firebase**
   - Crie um arquivo `.env.local` (ou atualize `src/firebase/config.js`)
   - Adicione suas credenciais do Firebase

4. **Inicie o servidor de desenvolvimento**

```bash
npm start
```

5. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000) no navegador

### Scripts Disponíveis

```bash
npm start        # Inicia o servidor de desenvolvimento
npm build        # Compila o projeto para produção
npm test         # Executa os testes
npm eject        # Expõe a configuração do Create React App (irreversível)
```

---

## 📊 Fluxo de Utilização

### 1. Candidato

```
Seleção de Tipo → Cadastro de Candidato → Construção de CV
    ↓
Visualizar Vagas → Filtrar por Área → Aplicar em Vaga
    ↓
Ver Avaliações de Professores → Atualizar Perfil
```

### 2. Empresa

```
Seleção de Tipo → Cadastro de Empresa → Publicar Vaga(s)
    ↓
Visualizar Candidatos que Aplicaram → Ver Avaliações de Professores
    ↓
Gerenciar Vagas → Acompanhar Aplicações
```

### 3. Professor

```
Seleção de Tipo → Cadastro de Professor
    ↓
Selecionar Candidato → Adicionar Avaliação (Habilidades + Comentário)
    ↓
Visualizar Avaliações Realizadas → Atualizar conforme necessário
```

---

## 🎨 Interface e UX

### Design System

- **Cores**: Predominância de azul (`blue-950`) como cor primária
- **Tipografia**: Hierarquia clara com títulos `font-bold` e textos `text-lg`
- **Responsividade**: Layout flexível com `flex`, `justify-evenly`, `lg:` breakpoints
- **Efeitos**: Sombras (`shadow-xl`, `drop-shadow-2xl`), bordas arredondadas (`rounded-lg`)
- **Transparência**: Uso de `opacity-90` para overlay elegante

### Componentes UI

- **Cards**: Containers com bordas, sombras e padding consistente
- **Modals**: Diálogos com `@headlessui/react` para acessibilidade
- **Navbars**: Barras de navegação fixas/sticky customizadas por perfil
- **Inputs**: Campos com máscaras para CPF, telefone, etc
- **Dropdowns**: Seleção customizada com ícones

---

## 📱 Responsividade

O projeto utiliza Tailwind CSS com breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px (usado amplamente no projeto)
- `xl`: 1280px
- `2xl`: 1536px

Exemplo:

```html
<div className="flex flex-col lg:flex-row lg:px-8">
  <!-- Layout em coluna no mobile, linha em lg -->
</div>
```

---

## 🔄 Atualizações em Tempo Real

O projeto usa `onSnapshot` do Firestore para atualizações em tempo real:

```javascript
const unsub = onSnapshot(collection(db, "tb04_vaga"), (snapshot) => {
  // Atualiza componente quando dados mudam no banco
});
```

Isso permite que mudanças em vagas, aplicações e comentários apareçam instantaneamente para todos os usuários.

---

## 📌 Funcionalidades Avançadas

### 1. Sistema de Comentários de Professores

- Professores selecionam habilidades específicas de um dropdown
- Adiciona comentário qualitativo sobre o candidato
- Empresas visualizam esses comentários ao ver perfis

### 2. Filtros Dinâmicos

- Candidatos filtram vagas por área de trabalho
- Remove duplicatas automaticamente
- Estado centralizado no Context

### 3. Upload de Imagens

- Integração com Firebase Storage
- Imagens de empresa em vagas
- Fotos de perfil de usuários

### 4. Persistência de Dados

- localStorage para dados do usuário logado
- Firestore para dados persistentes
- Session recovery após refresh

---

## 👥 Créditos

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) para conectar estudantes, professores e empresas na jornada de inserção profissional.

---

**Desenvolvido com ❤️ para facilitar o acesso de talentos ao mercado de trabalho**
