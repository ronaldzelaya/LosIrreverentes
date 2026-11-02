'use strict';
function notice(message){let d=document.createElement('dialog');d.className='copia-notice';let p=document.createElement('p');p.textContent=message;let b=document.createElement('button');b.textContent='Entendido';b.onclick=()=>d.close();d.append(p,b);document.body.append(d);d.addEventListener('close',()=>d.remove());d.showModal();}
document.addEventListener('submit',e=>{e.preventDefault();notice('Esta copia conserva el diseño del formulario. El envío requiere conectar un servicio propio; no se envió ni guardó ningún dato.');});
const menu=document.querySelector('button[aria-label="Abrir menú"]');
if(menu){let nav=document.createElement('nav');nav.className='copia-mobile';nav.hidden=true;nav.setAttribute('aria-label','Navegación móvil');for(let a of document.querySelectorAll('header nav a'))nav.append(a.cloneNode(true));document.querySelector('header').append(nav);menu.setAttribute('aria-expanded','false');menu.onclick=()=>{nav.hidden=!nav.hidden;menu.setAttribute('aria-expanded',String(!nav.hidden));};}
document.addEventListener('click',e=>{let b=e.target.closest('button');if(!b||b===menu||b.closest('dialog'))return;let t=(b.textContent+' '+(b.getAttribute('aria-label')||'')).trim();
if(/iniciar sesi.n|google|comentar|votar|participar|unirme/i.test(t)){notice('Esta función requiere un nuevo servidor y cuentas propias. La copia no utiliza las cuentas ni la base de datos del sitio original.');return;}
if(/^Reproducir/i.test(b.getAttribute('aria-label')||'')){let box=b.parentElement;let card=box;while(card&&!card.querySelector('a[href*="youtube.com/watch"]'))card=card.parentElement;let a=card?.querySelector('a[href*="youtube.com/watch"]');if(a)window.open(a.href,'_blank','noopener');return;}
if(/compartir/i.test(t)||b.querySelector('.lucide-share-2,.lucide-facebook,.lucide-twitter,.lucide-link')){if(navigator.share)navigator.share({title:document.title,url:location.href}).catch(()=>{});else notice('Puedes compartir la dirección de esta página cuando la publiques en tu nuevo hosting.');}
});
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.style.visibility='hidden';img.parentElement.title='Imagen no recuperada: '+img.alt;},{once:true}));
// Local filters for the recovered news list; no requests to the previous server.
const cards=[...document.querySelectorAll('main a[href^="noticias-"]')].filter(a=>a.querySelector('h2,h3'));
const search=document.querySelector('input[placeholder*="uscar"]');let category='';
function filter(){let q=(search?.value||'').toLocaleLowerCase();for(let a of cards)a.hidden=!(a.textContent.toLocaleLowerCase().includes(q)&&(!category||a.textContent.toLocaleLowerCase().includes(category)));}
if(search)search.addEventListener('input',filter);
document.querySelectorAll('main button').forEach(b=>{if(/^(Todos|Noticias|Análisis Táctico|Mercado de Fichajes|Jugadores|Equipos|Opinión)$/i.test(b.textContent.trim()))b.addEventListener('click',()=>{category=/^todos$/i.test(b.textContent.trim())?'':b.textContent.trim().toLocaleLowerCase();filter();});});
