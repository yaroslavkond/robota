function Select(e){let t=e.querySelector(".select__block-wrap"),c=e.querySelectorAll(".select__item"),l=e?.querySelector(".select__item.--checked .select__item-wrap").innerHTML;t.innerHTML=l,c.forEach((e=>{e.addEventListener("click",(()=>{t.innerHTML=e.innerHTML}))})),e.addEventListener("click",(()=>{e.classList.toggle("--open")}))}let $selects=document.querySelectorAll(".select");$selects.forEach(((e,t)=>{new Select(e)}));