// JavaScript Original do Sistema de Skills
const skills = []
const bootstrap = window.bootstrap

// Função para focar no campo nome quando a página carregar
window.onload = () => {
  document.getElementById("nome").focus()
  previa()
}

// Função para navegar entre campos com Enter
function handleEnter(event, nextFieldId) {
  if (event.key == "Enter") {
    document.getElementById(nextFieldId).focus()
  }
}

// Função para adicionar skill com Enter
function handleEnterSkill(event) {
  if (event.key == "Enter") {
    adicionarSkill()
  }
}

function adicionarSkill() {
  const input = document.getElementById("novaSkill")
  const skill = input.value.trim()

  if (skill == "") {
    alert("Digite uma skill!")
    input.focus()
    return
  }

  skills.push(skill)
  input.value = ""
  input.focus()

  mostrarSkills()
  previa()
}

function removerSkill(index) {
  skills.splice(index, 1)
  mostrarSkills()
  previa()

  // Volta o foco
  document.getElementById("novaSkill").focus()
}

function mostrarSkills() {
  const lista = document.getElementById("listaSkills")
  lista.innerHTML = ""

  const container = document.createElement("div")
  container.className = "skills-container mb-3"

  for (let i = 0; i < skills.length; i++) {
    const tag = document.createElement("div")
    tag.className = "skill-tag"
    tag.innerHTML = `
          <span>${skills[i]}</span>
          <button class="remove-btn" onclick="removerSkill(${i})">×</button>
      `
    container.appendChild(tag)
  }

  lista.appendChild(container)
}

// Botão escuro
function alternarTema() {
  // 1. Pega o elemento da área do código pelo ID
  const areaCode = document.getElementById("codigo")

  // 2. Pega o elemento do botão toggle (o switch)
  const botaoToggle = document.getElementById("themeToggle")

  // 3. Pega o elemento do ícone dentro do slider
  const icone = document.getElementById("themeIcon")

  // 4. Verifica se a área do código tem a classe 'dark-theme' (tema escuro)
  if (areaCode.classList.contains("dark-theme")) {
    // 5. Se está no tema escuro, muda para tema claro:

    // Remove a classe do tema escuro da área do código
    areaCode.classList.remove("dark-theme")

    // Adiciona a classe do tema claro na área do código
    areaCode.classList.add("light-theme")

    // Adiciona a classe 'active' no botão toggle (move o slider para direita)
    botaoToggle.classList.add("active")

    // Muda o ícone para sol (tema claro ativo)
    icone.textContent = "☀️"
  } else {
    // 6. Se está no tema claro, muda para tema escuro:

    // Remove a classe do tema claro da área do código
    areaCode.classList.remove("light-theme")

    // Adiciona a classe do tema escuro na área do código
    areaCode.classList.add("dark-theme")

    // Remove a classe 'active' do botão toggle (move o slider para esquerda)
    botaoToggle.classList.remove("active")

    // Muda o ícone para lua (tema escuro ativo)
    icone.textContent = "🌙"
  }
}

function previa() {
  const nome = document.getElementById("nome").value
  const profissao = document.getElementById("profissao").value
  const skillDigitando = document.getElementById("novaSkill").value.trim()

  const todasSkills = [...skills]
  if (skillDigitando != "") {
    todasSkills.push(skillDigitando)
  }

  let codigo = `<span class="keyword">function</span> <span class="function">introduce</span>() {
  <span class="keyword">const</span> <span class="variable">name</span> = <span class="string">"${nome}"</span>;
  <span class="keyword">const</span> <span class="variable">occupation</span> = <span class="string">"${profissao}"</span>;
  <span class="keyword">const</span> <span class="variable">skills</span> = [`

  for (let i = 0; i < todasSkills.length; i++) {
    codigo += `<span class="string">"${todasSkills[i]}"</span>`
    if (i < todasSkills.length - 1) {
      codigo += ", "
    }
  }

  codigo += `];

  <span class="keyword">let</span> <span class="variable">message</span> = "Olá, meu nome é " + <span class="variable">name</span> + ". Eu sou " + <span class="variable">occupation</span> + ".";
  
  <span class="keyword">if</span> (<span class="variable">skills</span>.length > 0) {
      <span class="variable">message</span> += " Minhas skills incluem: " + <span class="variable">skills</span>.<span class="function">join</span>(", ");
  }
  
  <span class="function">console.log</span>(<span class="variable">message</span>);
}

<span class="function">introduce</span>();`

  document.getElementById("codigo").innerHTML = codigo
}

function mostrarApresentacao() {
  const nome = document.getElementById("nome").value
  const profissao = document.getElementById("profissao").value

  let message = "Olá, meu nome é " + nome + ". Eu sou " + profissao + "."

  if (skills.length > 0) {
    message += " Minhas skills incluem: "
    for (let i = 0; i < skills.length; i++) {
      message += skills[i]
      if (i < skills.length - 1) {
        message += ", "
      }
    }
  }

  const resultado = document.getElementById("resultado")
  resultado.innerHTML = message
  resultado.style.display = "block"
}

// Função para fechar o menu mobile
function fecharMenuMobile() {
  const navbarCollapse = document.getElementById("navbarNav")
  const navbarToggler = document.querySelector(".navbar-toggler")

  // Verifica se o menu está aberto (tem a classe 'show')
  if (navbarCollapse.classList.contains("show")) {
    // Remove a classe 'show' para fechar o menu
    navbarCollapse.classList.remove("show")

    // Atualiza o estado do botão hambúrguer
    navbarToggler.setAttribute("aria-expanded", "false")
  }
}

// Função para destacar seção quando navegada
function highlightSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    // Remove destaque anterior de todas as seções
    const allSections = document.querySelectorAll(".sobre-section, .contato-section, .projetos-section")
    for (let i = 0; i < allSections.length; i++) {
      allSections[i].classList.remove("highlight")
    }

    // Adiciona destaque na seção atual
    section.classList.add("highlight")

    // Remove o destaque após 2 segundos
    setTimeout(() => {
      section.classList.remove("highlight")
    }, 2000)
  }
}

// Event listener para links de navegação
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  // Adiciona evento de clique para cada link de navegação
  for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i]

    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href === "#sobre") {
        e.preventDefault()

        // Scroll para a seção
        const section = document.getElementById("sobre")
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })

          // Destaca a seção após um pequeno delay
          setTimeout(() => {
            highlightSection("sobre")
          }, 500)
        }

        // FECHA O MENU MOBILE após clicar no link
        fecharMenuMobile()
      } else if (href === "#") {
        e.preventDefault()

        // Scroll para o topo
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })

        // FECHA O MENU MOBILE após clicar no link
        fecharMenuMobile()
      } else if (href === "#contato") {
        e.preventDefault()
        const section = document.getElementById("contato")
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" })
          setTimeout(() => {
            highlightSection("contato")
          }, 500)
        }
        fecharMenuMobile()
        } else if (href === "#projetos") {
        e.preventDefault()
        const section = document.getElementById("projetos")
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" })
          setTimeout(() => {
            highlightSection("projetos")
          }, 500)
        }
 
        fecharMenuMobile()
      } else {
        // Para outros links
        e.preventDefault()

        fecharMenuMobile()
      }
    })
  }

})

// Funções do Footer
function handlePhoneClick() {
  window.location.href = "tel:+351914968218"
}

function handleEmailClick() {
  window.location.href = "mailto:marcelle.marques.ml@gmail.com"
}

function linkedInClick() {
  window.open("https://www.linkedin.com/in/marcelle-marques-a56151168/", "_blank")
}

function gitHubClick() {
  window.open("https://github.com/cellemfs", "_blank")
}
function cvClick() {
  window.open("https://www.flipsnack.com/CEAAED5EFB5/cv_marcelle_marques_ats/full-view.html", "_blank")
}




emailjs.init({
        publicKey: "Xsa78Kwr8Jwc2YFiw",
});

document.getElementById("contatoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeContato = document.getElementById("nomeContato").value;
    const emailContato = document.getElementById("emailContato").value;
    const mensagemContato = document.getElementById("mensagemContato").value;

    console.log(nomeContato, emailContato, mensagemContato);
   
    const submitButton = document.getElementById("enviarMensagem");
    submitButton.textContent = "Enviando...";
    const serviceID = "service_hcr1ddi";
    const templateID = "template_ytfhayf";

emailjs.send(serviceID, templateID,{
nomeContato: nomeContato,
emailContato: emailContato,
mensagemContato: mensagemContato,
}).then(() => {
    
    Toastify({

      text: "Mensagem enviada com sucesso!",

      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93e)",
        color: "white",
        borderRadius: "10px",
      },

    }).showToast();

    document.getElementById("contatoForm").reset();
    submitButton.textContent = "Enviar mensagem";
}).catch((error) => {
    Toastify({

      text: "Erro ao enviar mensagem. Tente novamente mais tarde.",

      duration: 3000,
      style: {
        background: "linear-gradient(to right,rgb(176, 47, 0),rgb(201, 76, 62))",
        color: "white",
        borderRadius: "10px",
      },

    }).showToast();
    document.getElementById("contatoForm").reset();
    console.error("Erro ao enviar mensagem:", error);
    submitButton.textContent = "Enviar mensagem";
})
});

// Dados dos projetos
const projetosData = {
  normaengtec: {
    titulo: "Portfolio Profissional",
    status: "Em Produção",
    descricao:
      "A NormaENGTEC é uma empresa especializada em infraestruturas elétricas e telecomunicações. Eles oferecem soluções completas em áreas como instalações elétricas, cabeamento de dados, Data Centers, iluminação LED, sistemas CFTV e fibra ótica.",
    imagem: "./images/normaengtec.webp",
    cliente: "NormaENGTEC",
    duracao: "3 semanas",
    tipo: "Website",
    ano: "2025",
    tecnologias: ["HTML/CSS", "JavaScript", "Bootstrap"],
    demoUrl: "https://norma-new.vercel.app/",
    codigoUrl: "https://github.com/cellemfs/normaNew",
  },
  kidzcoin: {
    titulo: "Kidz Coin App",
    status: "Concluído",
    descricao:
      "O Kidzcoin é uma app educativa e financeira que permite aos pais atribuírem 'Kidcoins' aos filhos como recompensa por tarefas. A aplicação ensina conceitos financeiros básicos de forma lúdica e interativa, promovendo a educação financeira desde cedo.",
    imagem: "./images/kidzCoin.webp",
    cliente: "Projeto Pessoal",
    duracao: "4 semanas",
    tipo: "App Mobile Design",
    ano: "2025",
    tecnologias: ["Figma", "UI/UX Design"],
    demoUrl: "https://www.figma.com/board/KofOaWRSy27T5wpgkEO5rv/Proj?node-id=0-1&t=iiqGvTq3i3YFH2qS-1",
    codigoUrl: null,
  },
  skills: {
    titulo: "Sistema de Skills",
    status: "Em Produção",
    descricao:
      "Uma ferramenta interativa que converte suas informações pessoais e habilidades técnicas em código JavaScript funcional, mostrando o processo de programação em tempo real. Ideal para demonstrar conceitos de programação de forma visual e educativa.",
    imagem: "./images/skills.webp",
    cliente: "Portfolio Pessoal",
    duracao: "2 semanas",
    tipo: "Aplicação Web",
    ano: "2025",
    tecnologias: ["JavaScript", "HTML/CSS", "Bootstrap"],
    // Mantém o link para a própria página, pois é uma aplicação interativa
    demoUrl: window.location.href,
    codigoUrl: "https://github.com/cellemfs/skills-system",
  },
}

// Função para abrir o modal do projeto
function abrirModalProjeto(projetoId) {
  const projeto = projetosData[projetoId]

  if (!projeto) {
    console.error("Projeto não encontrado:", projetoId)
    return
  }

  // Atualizar conteúdo do modal
  document.getElementById("projetoModalLabel").textContent = projeto.titulo
  document.getElementById("projetoStatus").textContent = projeto.status
  document.getElementById("projetoDescricao").textContent = projeto.descricao
  document.getElementById("projetoImagem").src = projeto.imagem
  document.getElementById("projetoImagem").alt = `Preview do ${projeto.titulo}`
  document.getElementById("projetoCliente").textContent = projeto.cliente
  document.getElementById("projetoDuracao").textContent = projeto.duracao
  document.getElementById("projetoTipo").textContent = projeto.tipo
  document.getElementById("projetoAno").textContent = projeto.ano

  // Atualizar tecnologias
  const tecnologiasContainer = document.getElementById("projetoTecnologias")
  tecnologiasContainer.innerHTML = ""

  for (let i = 0; i < projeto.tecnologias.length; i++) {
    const tag = document.createElement("span")
    tag.className = "projeto-modal-tech-tag"
    tag.textContent = projeto.tecnologias[i]
    tecnologiasContainer.appendChild(tag)
  }

  // Configurar botões de ação
  const btnDemo = document.getElementById("btnVerDemo")
  const btnCodigo = document.getElementById("btnVerCodigo")

  // Remover event listeners anteriores
  btnDemo.onclick = null
  btnCodigo.onclick = null

  // Configurar botão de demo
  if (projeto.demoUrl) {
    btnDemo.style.display = "flex"
    if (projeto.demoUrl === "#") {
      btnDemo.onclick = () => {
        // Fechar o modal e fazer scroll para o sistema de skills
        const modal = bootstrap.Modal.getInstance(document.getElementById("projetoModal"))
        modal.hide()

        // Scroll para o topo onde está o sistema
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    } else {
    btnDemo.onclick = () => window.open(projeto.demoUrl, "_blank")
    }
  } else {
    btnDemo.style.display = "none"
  }

  // Configurar botão de código
  if (projeto.codigoUrl) {
    btnCodigo.style.display = "flex"
    btnCodigo.onclick = () => window.open(projeto.codigoUrl, "_blank")
  } else {
    btnCodigo.style.display = "none"
  }

  // Abrir o modal
  const modal = new bootstrap.Modal(document.getElementById("projetoModal"))
  modal.show()
}

// Função para o botão "Ver mais" do primeiro projeto (função existente atualizada)
function vermais() {
  abrirModalProjeto("normaengtec")
}

