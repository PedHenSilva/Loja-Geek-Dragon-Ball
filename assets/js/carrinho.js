let usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
let compras = JSON.parse(sessionStorage.getItem("compras")) || [];

atualizarVisualizacao();

const buttons = document.querySelectorAll("#adicionar");

buttons.forEach((botao, index) => {
    botao.addEventListener('click', function(event) {
        let idNumero = index + 1;
        
        let nomeElemento = document.getElementById(`nm-item${idNumero}`);
        let precoElemento = document.getElementById(`pr-item${idNumero}`);

        if (nomeElemento && precoElemento) {
            let nomeText = nomeElemento.textContent.trim();
            let precoValor = parseFloat(precoElemento.getAttribute("value"));

            let compra = {
                descricao: nomeText, 
                valor: precoValor
            };
            
            compras.push(compra);
            salvarDados();
            atualizarVisualizacao();

            Swal.fire(
            {
                title: `Item adicionado ao carrinho!`,
                icon: "success"

            }
    );
        }
    });
});


function salvarDados() {
    sessionStorage.setItem("compras", JSON.stringify(compras));
}

function atualizarVisualizacao() {
    atualizarContador();
    atualizarModal();
}

function atualizarContador() {
    const contador = document.getElementById("contador-carrinho");
    if (contador) {
        if (compras.length > 0) {
            contador.style.display = "block";
            contador.innerText = compras.length;
        } else {
            contador.style.display = "none";
        }
    }
}

function atualizarModal() {
    const lista = document.getElementById("lista-itens");
    const totalDisplay = document.getElementById("valor-total");
    
    if (!lista) return; 

    lista.innerHTML = "";
    let total = 0;

    if (compras.length === 0) {
        lista.innerHTML = '<li class="list-group-item text-center">Seu carrinho está vazio...</li>';
    } else {
        compras.forEach((item, index) => {
            total += item.valor;
            
            let li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-danger btn-sm mr-2" onclick="removerItem(${index})" title="Remover item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <span style="font-family: 'OutfitEL';">${item.descricao}</span>
                </div>
                <span style="font-family: 'OutfitSB';">R$ ${item.valor.toFixed(2)}</span>
                `;
            lista.appendChild(li);
        });
    }

    if (totalDisplay) {
        totalDisplay.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

window.removerItem = function(index) {
    compras.splice(index, 1);
    
    salvarDados();
    atualizarVisualizacao();
}

window.limparCarrinho = function() {

    if (!usuarioLogado) {
        alert("Você precisa fazer login para finalizar sua compra!");
        window.location.href = "cadastro.html"; 
        return; 
    
    } else if (compras.length === 0) {
    Swal.fire(
        {
            title: `Seu carrinho ainda está vazio!`,
            html: `A compra não pode ser concluída.`,
            icon: "error",
        }
    );
        return;
    }

    
    
    Swal.fire(
            {
                title: `Compra realizada com sucesso!`,
                html: `Obrigado pela preferência, Saiyajin.`,
                icon: "success",

            }
    );

    compras = [];
    salvarDados();
    atualizarVisualizacao();
        
    $('#modalCarrinho').modal('hide'); 

}
