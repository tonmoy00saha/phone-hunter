const loadphone =async (searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data =await res.json();
    const phones = data.data;
    // console.log(phones);
    displayphone(phones,isShowAll);
  
}
const displayphone=(phones,isShowAll)=>{
    if(phones.length>12 && !isShowAll)
    {
       phones= phones.slice(0,12);
       document.getElementById('showallbtn').classList.remove('hidden');
    }
    else
    {
        document.getElementById('showallbtn').classList.add('hidden');
    }
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent='';
    phones.forEach(phone => {
       const phoneCard =   document.createElement('div');
   phoneCard.classList= `card bg-base-100 shadow-xl`;
   phoneCard.innerHTML= `
    <figure class="px-10 pt-10">
       <img
       src="${phone.image}"
       alt="phone_image"
       class="rounded-xl" />
   </figure>
   <div class="card-body items-center text-center">
       <h2 class="card-title">${phone.phone_name}</h2>
       <p>There are many variations of passages of available, but the majority have suffered</p>
       <h3 class="text-3xl font-bold my-3">Price: $999</h3>
       <div class="card-actions">
       <button class="btn btn-primary" id="showdetails" onclick="showDetails('${phone.slug}')">Show Details</button>
       </div>
   </div>
   `;
   phoneContainer.appendChild(phoneCard);
    });
    displayloader(true);
}
const searchField=(isShowAll=false)=>{
    const searchText = document.getElementById('search-field').value;
    loadphone(searchText,isShowAll);
    displayloader(false);
}
const displayloader=(isloading)=>{
    const Loading = document.getElementById('loading');
    if(!isloading)
        Loading.classList.remove('hidden');
    else
        Loading.classList.add('hidden');
}
const showall = ()=>{
    searchField(true);
}
const showDetails=async(id)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showmodal(phone);
    // console.log(data.data);
}
const showmodal=(phone)=>{
    const showDetailsImage = document.getElementById('show-details-image');
    showDetailsImage.innerHTML=` <img src="${phone.image}" alt="">`;
    const phoneDetailsContainer= document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML=`
    <h3 class="text-xl font-bold">${phone.name}</h3>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class="font-semibold">Storage : </span>${phone.mainFeatures.storage}</p>
    <p><span class="font-semibold">Display Size : </span>${phone.mainFeatures.displaySize}</p>
    <p><span class="font-semibold">Chipset : </span>${phone.mainFeatures.chipSet}</p>
    <p><span class="font-semibold">Memory : </span>${phone.mainFeatures.memory}</p>
    <p><span class="font-semibold">Slug : </span>${phone.slug}</p>
    <p><span class="font-semibold">ReleaseDate : </span>${phone?.releaseDate || 'No date found'}</p>
    <p><span class="font-semibold">Brand : </span>${phone.brand}</p>
    <p><span class="font-semibold">GPS : </span>${phone?.others?.GPS||"NO GPS"}</p>
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
    </div>
    `;
    show_details.showModal();
}
// loadphone();