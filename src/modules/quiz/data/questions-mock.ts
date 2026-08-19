import { QuizQuestion } from "../domain/entities/question";

export const liveCodingQuestions: QuizQuestion[] = [
  // NÍVEL FÁCIL: JÚNIOR (5 Questões)
  {
    id: "j1",
    title:
      "O candidato tentou renderizar uma lista de usuários, mas a tela ficou em branco e o console mostrou: 'Cannot read properties of undefined (reading 'map')'. Qual o erro?",
    codeSnippet: `export function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}`,
    options: [
      "Faltou colocar a diretiva 'use client' no topo do arquivo.",
      "A prop 'users' veio indefinida antes da API responder, quebrando o método .map().",
      "O componente não pode renderizar tags HTML sem estar dentro de um loop useMemo.",
      "O React exige que a propriedade 'key' seja obrigatoriamente um número inteiro.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Tentar executar .map() em algo indefinido quebra o JavaScript. A boa prática é usar encadeamento opcional (users?.map) ou uma validação prévia de curto-circuito.",
    difficulty: "Junior",
  },
  {
    id: "j2",
    title:
      "Qual das opções altera o estado corretamente usando closures no React, garantindo que adições rápidas consecutivas não percam dados?",
    hasCodeInOptions: true,
    options: [
      "setItems([...items, newItem])",
      "setItems(prevItems => [...prevItems, newItem])",
      "items.push(newItem); setItems(items)",
      "setItems(items.concat(newItem))",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Passar uma função callback (prevItems => ...) garante que o React forneça o estado mais recente da fila de renderização, eliminando o risco de ler referências desatualizadas causadas por closures.",
    difficulty: "Junior",
  },
  {
    id: "j3",
    title:
      "Um candidato criou um useEffect para disparar um alerta toda vez que o ID do produto mudasse, mas o código entrou em loop infinito de renderização. O que causou isso?",
    codeSnippet: `useEffect(() => {
  fetchProductDetails(productId);
  console.log("Produto updated");
});`,
    hasCodeInOptions: true,
    options: [
      "}); // O array de dependências foi omitido, fazendo o efeito rodar em TODA renderização.",
      "}, [fetchProductDetails]); // Passar funções que alteram o estado sem useCallback.",
      "}, [productId]); // O array de dependências deveria conter apenas dados primitivos estáticos.",
      "}, []); // Deixar o array vazio bloqueia a primeira renderização do componente.",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Omitir completamente o segundo argumento do useEffect faz com que ele execute após cada renderização do componente. Se o efeito disparar uma alteração de estado (como carregar dados), ele causará um loop infinito.",
    difficulty: "Junior",
  },
  {
    id: "j4",
    title:
      "O candidato alterou uma propriedade do estado diretamente (mutação) e chamou a função modificadora. Por que a tela do navegador NÃO atualizou?",
    codeSnippet: `const [user, setUser] = useState({ name: "Dev", level: 1 })
function upgrade() {
  user.level = 2;
  setUser(user);
}`,
    options: [
      "O useState só aceita a substituição de tipos primitivos como strings e numbers.",
      "O React faz uma comparação rasa de referências (Shallow Comparison). Como o endereço de memória do objeto 'user' continuou o mesmo, o React ignorou a atualização.",
      "O compilador do Next.js bloqueia mutações em tempo de execução enviando um erro 500.",
      "Funções de alteração de escopo direto exigem o uso da diretiva 'use mutation'.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "O React baseia-se no princípio da imutabilidade. Para disparar uma renderização, a referência do novo estado precisa ser diferente. O correto seria: setUser({ ...user, level: 2 }).",
    difficulty: "Junior",
  },
  {
    id: "j5",
    title:
      "A busca digitada pelo usuário dispara uma requisição HTTP a cada tecla pressionada, derrubando o servidor de homologação. Qual técnica resolve isso no input?",
    options: [
      "Throttle de cliques no botão de submissão.",
      "Debounce, postergando o disparo da busca até que o usuário pare de digitar por um tempo mínimo.",
      "Envelopar o input de texto dentro de um componente de barreira suspense assíncrono.",
      "Trocar o hook useState por referências do useRef para travar o teclado.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "O Debounce atrasa a execução de uma função. Se o usuário digitar uma palavra de 6 letras rapidamente, o Debounce aguarda a pausa da digitação para fazer apenas 1 requisição em vez de 6.",
    difficulty: "Junior",
  },

  // NÍVEL MÉDIO: PLENO (5 Questões)

  {
    id: "p1",
    title:
      "O console disparou o aviso: 'Hydration failed because the server rendered HTML didn't match the client'. Qual condicional gerou esse comportamento?",
    codeSnippet: `export function ProfileHeader() {
  const token = typeof window !== 'undefined' && localStorage.getItem('auth')
  return <div>{token ? "Conectado" : "Visitante"}</div>
}`,
    options: [
      "O componente deveria ser um Server Component nativo com busca assíncrona.",
      "O Next.js não aceita renderizações condicionais baseadas em strings booleanas.",
      "O servidor gerou o HTML como 'Visitante' (sem window), mas o cliente leu o localStorage e tentou forçar 'Conectado' no handshake inicial.",
      "O uso do Tailwind CSS alterou o tamanho da tag div de forma assíncrona.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Erros de hidratação acontecem quando a estrutura inicial do DOM gerada pelo servidor é diferente da gerada pelo navegador. Estados baseados em LocalStorage ou objetos de tela devem esperar a montagem do cliente (useEffect).",
    difficulty: "Pleno",
  },
  {
    id: "p2",
    title:
      "No TypeScript, qual a forma CORRETA de criar um componente de botão que aceita todas as propriedades nativas de uma tag button do HTML sem desativar a tipagem estrita?",
    hasCodeInOptions: true,
    options: [
      "interface ButtonProps { [key: string]: any }",
      "interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}",
      "interface ButtonProps extends HTMLElement { type?: string }",
      "type ButtonProps = Omit<HTMLButtonElement, 'children'>",
    ],
    correctAnswerIndex: 1,
    explanation:
      "O utilitário ButtonHTMLAttributes mapeia de forma estrita e segura todos os atributos (onClick, disabled, type, etc.) e eventos nativos que a tag button aceita no ecossistema React.",
    difficulty: "Pleno",
  },
  {
    id: "p3",
    title:
      "O useEffect abaixo gera um vazamento de memória (Memory Leak) destrutivo no navegador sempre que o componente é desmontado. O que falta no código?",
    codeSnippet: `useEffect(() => {
  const id = setInterval(() => {
    console.log("Verificando sessão...");
  }, 1000);
}, []);`,
    hasCodeInOptions: true,
    options: [
      "Adicionar a variável 'id' dentro do array de dependências do efeito.",
      "Retornar uma função de limpeza (cleanup) executando: return () => clearInterval(id);",
      "Substituir o escopo da arrow function por uma chamada assíncrona com try/catch.",
      "Configurar a propriedade 'staleTime' do timer para zero segundos.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Processos contínuos como setInterval, setTimeout ou listeners globais criados dentro de efeitos continuam rodando na memória mesmo se o componente sumir da tela. É obrigatório limpar no retorno do efeito.",
    difficulty: "Pleno",
  },
  {
    id: "p4",
    title:
      "O código abaixo resulta em um erro de compilação do TypeScript dentro do useEffect. Qual o motivo apontado pelo compilador?",
    codeSnippet: `export function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
}`,
    options: [
      "Referências geradas por useRef não expõem métodos interativos de foco nativos.",
      "A função .focus() só pode ser acionada de dentro de escopos de eventos de clique.",
      "O TypeScript avisa que 'inputRef.current' pode ser nulo no início, exigindo encadeamento seguro: inputRef.current?.focus();",
      "Faltou tipar o hook informando o estado genérico como undefined.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Como o valor inicial do useRef foi definido como null, o TypeScript bloqueia o acesso direto à propriedade de forma estrita para evitar erros de ponteiro nulo (NullPointer) em tempo de execução.",
    difficulty: "Pleno",
  },
  {
    id: "p5",
    title:
      "O dashboard abaixo entra em um loop infinito de renderização assim que carrega na tela. Qual a causa técnica desse comportamento?",
    codeSnippet: `export function Analytics() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const freshLogs = ["log-1", "log-2"];
    setLogs(freshLogs);
  }, [logs]);
}`,
    options: [
      "Arrays em JavaScript não podem ser armazenados dentro de estados locais do tipo useState.",
      "O useEffect escuta 'logs'. Como arrays possuem novas referências de memória a cada execução, o setLogs altera o estado e engatilha o próprio efeito recursivamente.",
      "A declaração de constantes locais dentro de escopos de efeitos colaterais é proibida.",
      "O React barra atualizações sequenciais de estados estruturados sem um useReducer.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Arrays e objetos em JavaScript são comparados por referência de memória. Toda vez que setLogs roda, ele gera uma nova referência para 'logs', fazendo o array de dependências achar que o dado mudou e disparando o efeito de novo.",
    difficulty: "Pleno",
  },

  // NÍVEL DIFÍCIL: SENIOR (5 Questões)

  {
    id: "s1",
    title:
      "O candidato está utilizando o TanStack Query v5 para carregar dados paginados, mas a tela inteira pisca em branco a cada mudança de página. Qual configuração resolve esse problema de transição fluida?",
    hasCodeInOptions: true,
    options: [
      "useQuery({ queryKey, queryFn, keepPreviousData: true })",
      "useQuery({ queryKey, queryFn, placeholderData: keepPreviousData })",
      "useQuery({ queryKey, queryFn, gcTime: Infinity })",
      "useQuery({ queryKey, queryFn, cacheTime: 0 })",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Na versão 5 do TanStack Query, a propriedade antiga 'keepPreviousData: true' foi removida. A forma moderna e correta é passar a função utilitária 'placeholderData: keepPreviousData' importada do pacote.",
    difficulty: "Senior",
  },
  {
    id: "s2",
    title:
      "No TanStack Query v5, qual propriedade do useQuery determina o tempo máximo que uma informação inativa fica guardada na memória antes de ser limpa pelo Garbage Collector?",
    hasCodeInOptions: true,
    options: ["staleTime", "gcTime", "refetchInterval", "timeToLive"],
    correctAnswerIndex: 1,
    explanation:
      "Na v5, a antiga propriedade 'cacheTime' foi renomeada para 'gcTime' (Garbage Collection Time) para descrever de forma precisa o comportamento de limpeza de dados inativos da memória do cache.",
    difficulty: "Senior",
  },
  {
    id: "s3",
    title:
      "Para realizar Server-Side Rendering (SSR) transferindo dados pré-buscados no servidor diretamente para o cliente usando TanStack Query no Next.js (App Router), qual componente de barreira deve envolver o children?",
    hasCodeInOptions: true,
    options: [
      "O componente <Hydrate> recebendo o estado desidratado via propriedade state.",
      "O componente <HydrationBoundary> recebendo o estado desidratado via propriedade state.",
      "O componente <QueryClientProvider> configurado com a propriedade ssr: true.",
      "A função de encapsulamento pura cache() aplicada no layout principal.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "No ecossistema moderno do TanStack Query com Next.js App Router, a fronteira de sincronização de cache de dados pré-buscados (pre-fetched) no servidor é feita através do componente <HydrationBoundary>.",
    difficulty: "Senior",
  },
  {
    id: "s4",
    title:
      "O componente abaixo faz cálculos matemáticos pesados em uma lista de relatórios. Por que a memoização abaixo falha e recomputa o cálculo a cada clique no botão de tema?",
    codeSnippet: `export function Reports({ items }) {
  const [theme, setTheme] = useState("dark");
  const filtered = items.filter(i => i.active);
  const total = useMemo(() => computeHeavyData(filtered), [filtered]);
  return <button onClick={() => setTheme("light")}>Mudar Tema</button>
}`,
    options: [
      "O hook useMemo não aceita o retorno de funções puras estruturadas de escopos externos.",
      "A variável 'filtered' é recriada com uma nova referência de memória a cada renderização causada pela mudança do tema, invalidando a dependência do useMemo.",
      "Modificações de estados do tipo string barram a leitura do cache interno do React.",
      "O useMemo deve ser envelopado obrigatoriamente dentro de um ciclo de vida do useEffect.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Como a filtragem acontece solta no corpo do componente, a constante 'filtered' ganha uma nova referência a cada render (mesmo que os dados sejam iguais). O correto seria colocar a lógica do filter dentro do próprio useMemo.",
    difficulty: "Senior",
  },
  {
    id: "s5",
    title:
      "Ao criar uma arquitetura complexa de micro-frontends, o desenvolvedor percebe que o Zustand está limpando o estado global ao navegar entre páginas devido à reinstanciação do Contexto. Qual padrão mitiga isso?",
    options: [
      "Adicionar a diretiva 'use shared store' no arquivo de configuração do Zustand.",
      "Exportar a loja utilizando um Singleton persistido fora do ciclo de vida dos componentes ou envelopar em um Context Provider customizado passando a referência estável.",
      "Migrar obrigatoriamente todo o gerenciamento de estados reativos para cookies criptografados.",
      "Desativar as rotas dinâmicas do roteador e forçar o uso de recarregamentos de página (SRA).",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Em ambientes onde a árvore de componentes pode desmontar completamente, expor a instância do Zustand através de um Context Provider customizado garante que a referência da loja permaneça estável e ligada à sessão.",
    difficulty: "Senior",
  },
];
