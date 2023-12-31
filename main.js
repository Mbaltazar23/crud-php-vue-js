var url = "bd/crud.php";
$(document).ready(function () {
    $('#movilesTable').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
    });
});

var appMoviles = new Vue({
    el: "#appMoviles",
    data: {
        moviles: [],
        accionCancelada: false,
        marca: "",
        modelo: "",
        stock: "",
        total: 0
    },
    methods: {
        //BOTONES
        btnAlta: async function () {
            const { value: formValues, isConfirmed } = await Swal.fire({
                title: "Nuevo",
                html: '<div class="row"><label class="col-sm-3 col-form-label">Marca</label><div class="col-sm-7"><input id="marca" type="text" class="form-control"/></div></div> <div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" type="text" class="form-control"/></div></div> <div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" type="number" min="0" class="form-control"/></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#3085d6',
                preConfirm: () => {
                    return [
                        this.marca = document.getElementById('marca').value,
                        this.modelo = document.getElementById('modelo').value,
                        this.stock = document.getElementById('stock').value,
                    ]
                }
            });
    
            if (isConfirmed) {
                this.accionRealizada = true;
                if (this.marca == "" || this.modelo == "" || this.stock == 0) {
                    Swal.fire({
                        type: 'info',
                        title: 'Datos incompletos'
                    });
                } else {
                    this.altaMovil();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Toast.fire({
                        type: 'success',
                        title: '¡Producto Agregado!'
                    });
                }
            } else {
                this.accionRealizada = false; // La acción fue cancelada o el modal se ocultó
            }
        },

        btnEditar: async function (id, marca, modelo, stock) {
            await Swal.fire({
                title: "Editar",
                html: '<div class="row"><label class="col-sm-3 col-form-label">Marca</label><div class="col-sm-7"><input id="marca" value="' + marca + '" type="text" class="form-control"/></div></div> <div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" value="' + modelo + '" type="text" class="form-control"/></div></div> <div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" value="' + stock + '" type="number" min="0" class="form-control"/></div></div>',
                focusConfirm: false,
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    marca = document.getElementById('marca').value,
                            modelo = document.getElementById('modelo').value,
                            stock = document.getElementById('stock').value,
                            this.editarMovil(id, marca, modelo, stock);
                    Swal.fire("¡Actualizado!", "El registro se ha actualizado..", 'success')
                }
            })
        },
        
        btnBorrar: function (id) {
            Swal.fire({
                title: "¿Esta seguro de borrar este registro con el ID: " + id + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.value) {
                    this.borrarMovil(id);
                    //mostramos el msj sobre la eliminacion
                    Swal.fire("¡Eliminado!", "El registro ha sido borrado..", 'success');
                }
            })
        },

        btnActualizarStock: function(id, nuevoStock) {
            axios.post(url, { opcion: 5, id: id, stock: nuevoStock }).then((response) => {
                this.listarMoviles(); // Vuelve a cargar los datos
                this.actualizarTotal(); // Actualiza el total
            });
        },

        //PROCEDIMIENTOS

        //Procedimiento Listar
        listarMoviles: function () {
            axios.post(url, {opcion: 4}).then(response => {
                this.moviles = response.data;
                console.log(this.moviles)
            })
        },
        //Procemiento CREAR
        altaMovil: function () {
            axios.post(url, {opcion: 1, marca: this.marca, modelo: this.modelo, stock: this.stock}).then(response => {
                this.listarMoviles()
            });
            this.marca = "";
            this.modelo = "";
            this.stock = 0;
        },

        //Procedimiento EDITAR
        editarMovil: function (id, marca, modelo, stock) {
            axios.post(url, {opcion: 2, id: id, marca: marca, modelo: modelo, stock: stock}).then(response => {
                this.listarMoviles()
            });

        },

        //Procedimiento BORRAR
        borrarMovil: function (id) {
            axios.post(url, {opcion: 3, id: id}).then(response => {
                this.listarMoviles()
            });
        },

        //Procemiento Actualizar Stock
        actualizarTotal() {
            this.total = 0;
            for (movil of this.moviles) {
                this.total += parseInt(movil.stock);
            }
        },
    },
    created: function () {
        this.listarMoviles()
    },
    computed: {
        totalStock() {
            this.total = 0;
            for (movil of this.moviles) {
                this.total = this.total + parseInt(movil.stock);
            }
            return this.total;
        }
    }
});
