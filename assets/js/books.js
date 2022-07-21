let home = document.querySelector(".home");
home.addEventListener('mouseover', function(){
    home.style.cursor = 'pointer';
    home.style.color = '#8EA5EB';
    home.style.opacity = '1';
});
home.addEventListener('mouseout', function(){
    home.style.color = '#000000';
    home.style.opacity = '0.44';
});
home.addEventListener('click', function(){
    window.location = './index.html';
});

let list = document.querySelector('.list');
list.addEventListener('mouseover', function(){
    list.style.cursor = 'pointer';
    list.style.color = '#8EA5EB';
    list.style.opacity = '1';
});
list.addEventListener('mouseout', function(){
    list.style.color = '#000000';
    list.style.opacity = '0.44';
});
list.addEventListener('click', function(){
    window.location = './form.html';
});

let start = document.querySelector('.mulai');
start.addEventListener('mouseover', function(){
    start.style.cursor = 'pointer';
});
start.addEventListener('click', function(){
    window.location = './form.html';
});


