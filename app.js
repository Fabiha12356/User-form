const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let form = document.querySelector("#form-valid");
// console.log(form);





let subbutton = document.querySelector("button");
console.log(subbutton);

form && form.addEventListener("submit", async(e)=>{
e.preventDefault();


let flag = false;
let inputs = document.querySelectorAll("input");
console.log(inputs[0].value)

inputs.forEach((input)=>{
    if(input.value === ""){
        input.classList.add("line");
        flag = true
    }
    
})

if(flag){
    return;
}


let userDta =  new FormData(form)
console.log(userDta);
let userInfo = Object.fromEntries(userDta);
console.log(userInfo);

if(userInfo){
    Swal.fire({
  title: "Sign UP!",
  icon: "success",
  draggable: true
});
setTimeout(() => {
    window.location.href = "/home.html"
}, 2000);
}


let{emailid,firstname,lastname,address,course,dob,gender,city,password}= userInfo


try{
    const { error } = await client
  .from('Users-data')
  .insert({
    "name" : firstname,
    course,
    gender,
    dob,
    "fathername" : lastname,
    address,
  })
  console.log(error)
}
catch(error){
    console.log(error)
    if(error){
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});
    }
}



try{
    const { data, error } = await client.auth.signUp({
  "email": emailid,
  password,
})
}
catch(error){
    console.log(error)
}

inputs.forEach((input)=>{
    input.value ="";
})

})




let logoutBtn =document.querySelector("#SignoutBtn");
console.log(logoutBtn);

 logoutBtn && logoutBtn.addEventListener("click", async () => {
    const { error } = await client.auth.signOut();

    if (error) {
        console.log(error);
    } else {
        console.log("User logged out");
        window.location.href = "/index.html";
    }
});

