<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="bootstrap/images/icono.png" type="image/x-icon">
    <title>Inicio</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="plugins/sweetalert2/sweetalert2.min.css"/>
    <link rel="stylesheet" href="main.css"/>
</head>
<body>
    <header>
        <br>
        <h2 class="text-center text-dark"><span class="badge badge-success">CRUD con VUE.JS</span></h2>
    </header>
    <div id="appMoviles">
        <div class="container">
            <div class="row">
                <div class="col">
                    <button @click="btnAlta" class="btn btn-success" title="Nuevo"><i class="fas fa-plus-circle fa-2xs"></i></button>
                </div>
                <div class="col text-right">
                    <h5>Stock Total: <span class="badge badge-success">{{totalStock}}</span></h5>
                </div>
            </div>
        <div class="row mt-5">
            <div class="col-lg-12">
                <div class="table-responsive"> <!-- Agrega un div contenedor para hacer la tabla responsive -->
                    <table class="table table-striped" id="movilesTable">
                        <thead>
                            <tr class="bg-primary text-light">
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(movil, indice) of moviles">
                                <td>{{movil.id}}</td>
                                <td>{{movil.marca}}</td>
                                <td>{{movil.modelo}}</td>
                                <td>
                                    <div class="col-md-8">
                                    <input type="number" v-model.number="movil.stock" class="form-control text-right" @change="btnActualizarStock(movil.id, movil.stock)"/>
                                    </div>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button class="btn btn-secondary" title="Editar" @click="btnEditar(movil.id, movil.marca, movil.modelo, movil.stock)"><i class="fas fa-pencil-alt"></i></button>
                                        <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(movil.id)"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!--JQuery, Pooper.js, Bootstrap JS-->
    <script src="jquery/jquery-3.7.1.min.js"></script>
    <script src="plugins/fontawesome/fontawesome.js"></script>
    <script src="popper/popper.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <!--Vue.js-->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
    <!--Axios-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.js"></script>
    <!--Sweet Alert 2-->
    <script src="plugins/sweetalert2/sweetalert2.all.min.js"></script>
    <!--Datatables -->
    <script src="jquery/datatables/jquery.dataTables.min.js"></script>
    <script src="jquery/datatables/dataTables.bootstrap.min.js"></script>
    <!--Codigo custom-->
    <script src="main.js"></script>
</body>
</html>
