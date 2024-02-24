<template>
    <div>
        <button @click="registerCheckIn">Registrar Ingreso</button>
        <button @click="showVehicleList">Listar Vehículos</button>
        <button @click="checkOutVehicle">Retirar Carro</button>

        <div v-if="currentOption === 'registrarIngreso'">
            <!-- Formulario para registrar el ingreso -->
            <form @submit.prevent="submitCheckInForm">
                <label for="licensePlate">Placa:</label>
                <input v-model="licensePlate" type="text" required>

                <label for="color">Color:</label>
                <input v-model="color" type="text" required>

                <label for="photo">Foto:</label>
                <input type="file" @change="handleFileChange" accept="image/*">

                <button type="submit">Registrar Ingreso</button>
            </form>
        </div>

        <div v-if="currentOption === 'listarVehiculos'">
            <div class="car-container" v-for="car in cars" :key="car.licensePlate">
                <div class="car-item">
                    <img :src="car.photoPath" alt="Car Photo" class="car-photo">
                    <div class="car-details">
                        <p><strong>Placa:</strong> {{ car.licensePlate }}</p>
                        <p><strong>Color:</strong> {{ car.color }}</p>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="currentOption === 'retirarCarro'">
            <!-- Formulario para retirar un carro -->
            <form @submit.prevent="submitRetirarForm">
                <label for="retirarLicensePlate">Placa a retirar:</label>
                <input v-model="retirarLicensePlate" type="text" required>

                <button type="submit">Retirar Carro</button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const currentOption = ref('');
const licensePlate = ref('');
const color = ref('');
const photo = ref(null);
const cars = ref([]);
const retirarLicensePlate = ref('');

const registerCheckIn = () => {
    currentOption.value = 'registrarIngreso';
};

const showVehicleList = async () => {
    currentOption.value = 'listarVehiculos';
    try {
        const response = await axios.get('http://localhost:8000/cars');
        cars.value = response.data.vehicles;
    } catch (error) {
        console.error('Error al obtener la lista de vehículos:', error);
        alert('Ocurrió un error al intentar obtener la lista de vehículos');
    }
};


const checkOutVehicle = () => {
    currentOption.value = 'retirarCarro';
};

const submitCheckInForm = async () => {
    const formData = new FormData();
    formData.append('licensePlate', licensePlate.value);
    formData.append('color', color.value);
    formData.append('photo', photo.value);

    console.log(formData)

    try {
        const response = await axios.post('http://localhost:8000/cars', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            console.log('Datos guardados con éxito');
            alert('Datos guardados con éxito');
            clearForm()
        } else {
            console.error('Error al guardar los datos');
            alert('Datos no guardados');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al intentar guardar los datos');
    }
};

const clearForm = () => {
    licensePlate.value = "";
    color.value = "";
    photo.value = null;
}

const handleFileChange = (event) => {
    // Manejar el cambio de archivo para la foto
    photo.value = event.target.files[0];
};

const submitRetirarForm = async () => {
    // Llamada a la API para retirar el carro
    // Puedes utilizar axios u otra librería para hacer la llamada HTTP
    // Ejemplo: const response = await axios.patch('/cars', { license_plate: retirarLicensePlate.value });
    // Limpiar el formulario después de la llamada exitosa
    retirarLicensePlate.value = '';
};
</script>

<style scoped>
div {
    text-align: center;
    margin: 20px;
}

button {
    padding: 10px;
    margin: 5px;
    font-size: 16px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: whitesmoke;
    background-color: rgb(37, 150, 190);
}

form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
}

label {
    margin: 5px 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;

}

input {
    padding: 8px;
    margin: 5px 0;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin: 5px 0;
}
.car-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .car-item {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 10px;
        width: 200px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    .car-photo {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .car-details {
        text-align: left;
    }

</style>

  