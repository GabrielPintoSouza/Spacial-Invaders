kaboom({
    width: 600,
    height: 600,
    background: [0, 0, 0]
});

const naveVelocidade = 300;
const tiroVelocidade = 200;
const alienVelocidade = 200;// Fazer com que aumente progressivamente a cada 25 pontos

const nave = add([
    rect(50, 80),
    color(100, 100, 100),
    pos(250, 500),
    "nave"
]);//Mudar o ponto de ancoragem

const placar = add([
    text("Pontuação: 0",{
        size: 15,
        width: 150,
    }),
    pos(20, 20),
    {
        pontos: 0
    }
])

loop(1, ()=>{
    const alien = add([
        rect(50, 80),
        color(83, 155, 95),
        area(),
        pos(rand(0, width()), 0),
        move(DOWN, alienVelocidade),
        offscreen({destroy:true, distance: 20}),
        "alien"
    ]);
});


onKeyDown("a", ()=>{
    nave.move(- naveVelocidade, 0);
});

onKeyDown("d", ()=>{
    nave.move(naveVelocidade, 0);
});

onKeyPress("space", ()=>{
    const tiro = add([
        rect(5, 10),
        color(184, 173, 18),
        area(),
        pos(nave.pos.x + nave.width / 2 - 2.5, nave.pos.y - 7),
        move(UP, tiroVelocidade),
        offscreen({destroy:true, distance: 20})
    ]);

    tiro.onCollide("alien", (obj) =>{
        addKaboom(obj.pos);
        destroy(obj);
        destroy(tiro);
        placar.pontos++;
        placar.text = "Pontuação: "+placar.pontos;
    });
})

onUpdate("alien", (a) => {
    if ((a.pos.y > height())) {
        placar.pontos = 0;
        placar.text = "Game Over";
        wait(1.5, ()=>{
            destroyAll("alien");
            nave.moveTo(250, 500);
            placar.text = "Vai lá!!"
        })
        
    }
});

//Criar um OnUpdate para que se a nave saia de tela ela seja teleportada para o lado oposto
onUpdate("nave", (n) =>{
    if(n.pos.x > width()){
        n.moveTo(1, 500);
    }else if(n.pos.x < 0){
        n.moveTo(width(), 500);
    }
})


//Criar um inimigo especial que surja a cada 25 pontos


