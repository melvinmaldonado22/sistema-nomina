const url_empleados = `http://localhost:3000/empleados`;
const ISR = 0.01
let bono = 0
let deduccion = 0
fetch(url_empleados, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => {
    return response.json()
})
.then(result =>{
    let data;
    data= result;
    for(let i=0; i<data.length; i++){
        switch(data[i].cargo.toLowerCase()){
            case "analista":
                calcular_bono(20, 0.03, data[i].dias_trabajados, data[i].salario)
                calcular_deduccion(20, 0.02, data[i].dias_trabajados, data[i].salario)
                break;
            case "desarrollador":
                calcular_bono(25, 0.015, data[i].dias_trabajados, data[i].salario)
                calcular_deduccion(25, 0.02, data[i].dias_trabajados, data[i].salario)
                break;
            case "gerente":
                calcular_bono(24, 0.0342, data[i].dias_trabajados, data[i].salario)
                calcular_deduccion(24, 0.012, data[i].dias_trabajados, data[i].salario)
                break;
            default:
                console.log("cargo no encontrado!!");
        }
        document.getElementById('tbl_empleados').innerHTML+=
        `
        <tr>
            <th scope="row">${i+1}</th>
                <td>${data[i].nombre}</td>
                <td>${data[i].cargo}</td>
                <td class="text-center">${data[i].dias_trabajados}</td>
                <td class="text-center">L. ${data[i].salario}</td>
                <td class="text-center">L. ${bono}</td>
                <td class="text-center">L. -${deduccion}</td>
                <td class="text-center">L. -${data[i].salario*ISR}</td>
                <td class="text-center">L. ${((data[i].salario-(data[i].salario*ISR))-deduccion)+bono}</td>
        </tr>
        `
    }
} )
.catch(error => console.log('error', error));

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.formulario');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = formulario.querySelector('input[name="nombre"]').value;
        const cargo = formulario.querySelector('input[name="cargo"]').value;
        const diasTrabajados = parseInt(formulario.querySelector('input[name="dias_trabajados"]').value);
        const salario = parseFloat(formulario.querySelector('input[name="salario"]').value);

        const datosEmpleado = {
            nombre: nombre,
            cargo: cargo,
            dias_trabajados: diasTrabajados,
            salario: salario
        };
        fetch("http://localhost:3000/empleados/guardar-empleado", {
            method: 'POST',
            body: JSON.stringify(datosEmpleado),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(result =>{
            console.log(result);
        } )
        .catch(error => console.log('error', error));
    });
});

function calcular_bono (dias_trabajo, bonificacion, dias_trabajados, salario) {
    let diasTrabajados = dias_trabajados - dias_trabajo
        if(diasTrabajados<=0){
            bono = 0
        }else{
            bono = (salario*bonificacion)*diasTrabajados 
        }
}

function calcular_deduccion (dias_trabajo, deducir, dias_trabajados, salario) {
    let diasTrabajados = dias_trabajo - dias_trabajados
        if(diasTrabajados<=0){
            deduccion = 0
        }else{
            deduccion = (salario*deducir)*diasTrabajados 
        }
}