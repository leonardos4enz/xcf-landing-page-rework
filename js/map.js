document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando inicialización del mapa');

    // Verificar si el contenedor del mapa existe
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('No se encontró el contenedor del mapa');
        return;
    }
    console.log('Contenedor del mapa encontrado');
    
    // Establecer dimensiones mínimas para asegurar que el mapa sea visible
    mapContainer.style.minHeight = '400px';

    // Inicializar el mapa
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-102.552784, 23.634501]), // Centro de México
            zoom: 5
        })
    });

    // Crear la capa de marcadores
    const vectorSource = new ol.source.Vector();
    const vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    
    // Función para crear un marcador
    function crearMarcador(sucursal) {
        const feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([sucursal.longitud, sucursal.latitud])),
            nombre: sucursal.nombre,
            telefono: sucursal.telefono,
            correo: sucursal.correo,
            mensaje: sucursal.mensaje
        });
        
        const marker = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: '#3498db'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        });
        
        feature.setStyle(marker);
        return feature;
    }

    // Función para mostrar el popup
    function mostrarPopup(sucursal) {
        const popup = document.getElementById('popup');
        const popupTitle = document.getElementById('popup-title');
        const popupPhone = document.getElementById('popup-phone-value');
        const popupEmail = document.getElementById('popup-email-value');
        const googleLink = popup.querySelector('.view-on-google');

        // Actualizar el contenido del popup
        popupTitle.textContent = sucursal.nombre;
        popupPhone.textContent = sucursal.telefono;
        popupEmail.textContent = sucursal.correo;

        // Configurar el enlace de Google Maps
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${sucursal.latitud},${sucursal.longitud}`;
        googleLink.href = googleMapsUrl;

        // Mostrar el popup
        popup.classList.add('active');
    }

    // Función para actualizar la lista de sucursales
    function actualizarListaSucursales(sucursalesFiltradas = jsonCentroServicio) {
        const listContainer = document.getElementById('sucursalList');
        if (!listContainer) return;
        
        listContainer.innerHTML = '';

        sucursalesFiltradas.forEach(sucursal => {
            const item = document.createElement('div');
            item.className = 'map-list-item';
            item.innerHTML = `
                <h4>${sucursal.nombre}</h4>
                ${sucursal.mensaje && sucursal.mensaje.includes('Atiende') ? `<p class="mensaje">${sucursal.mensaje}</p>` : ''}
            `;
            
            item.addEventListener('click', () => {
                // Limpiar marcadores anteriores
                vectorSource.clear();
                
                // Crear nuevo marcador
                const feature = crearMarcador(sucursal);
                vectorSource.addFeature(feature);
                
                // Centrar el mapa en la sucursal seleccionada
                map.getView().setCenter(ol.proj.fromLonLat([sucursal.longitud, sucursal.latitud]));
                map.getView().setZoom(13);
                
                // Mostrar el popup
                mostrarPopup(sucursal);

                // Asegurar que el mapa se centre correctamente
                setTimeout(() => {
                    map.updateSize();
                }, 100);
            });
            
            listContainer.appendChild(item);
        });
    }

    // Función para filtrar sucursales
    function filtrarSucursales() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const sucursalesFiltradas = jsonCentroServicio.filter(sucursal => 
            sucursal.nombre.toLowerCase().includes(searchTerm)
        );
        actualizarListaSucursales(sucursalesFiltradas);
    }

    // Agregar el evento de búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarSucursales);
    }

    // Inicializar la lista de sucursales
    actualizarListaSucursales();

    // Agregar la capa de marcadores al mapa
    map.addLayer(vectorLayer);

    // Añadir evento para verificar cuando el mapa está listo
    map.on('postrender', function() {
        console.log('Mapa renderizado');
    });

    // Verificar si el mapa se inicializó correctamente
    if (map) {
        console.log('Mapa inicializado correctamente');
        console.log('Centro del mapa:', map.getView().getCenter());
        console.log('Zoom del mapa:', map.getView().getZoom());
    } else {
        console.error('Error al inicializar el mapa');
    }
});

// Datos de las sucursales
const jsonCentroServicio = [
    {
        "nombre": "MONTERREY",
        "latitud": 25.80347,
        "longitud": -100.276489,
        "telefono": "81 8331 4080",
        "correo": "serviciomtm@xcf.com.mx"
    },
    {
        "nombre": "NUEVO LAREDO",
        "latitud": 27.5577435,
        "longitud": -99.6018055,
        "telefono": "86 7890 0010",
        "correo": "servicionlm@xcf.com.mx"
    },
    {
        "nombre": "MEXICO",
        "latitud": 19.549735,
        "longitud": -99.171854,
        "telefono": "55 2651 2000",
        "correo": "serviciomxm@xcf.com.mx"
    },
    {
        "nombre": "VERACRUZ",
        "latitud": 19.154306,
        "longitud": -96.238227,
        "telefono": "229 920.9500",
        "correo": "ver@xcf.com.mx"
    },
    {
        "nombre": "ALTAMIRA",
        "latitud": 22.333188,
        "longitud": -97.874368,
        "telefono": "833 125.1308",
        "correo": "alt@xcf.com.mx"
    },
    {
        "nombre": "MANZANILLO",
        "latitud": 19.087073689070785,
        "longitud": -104.29234827330684,
        "telefono": "314 334.0676",
        "correo": "impomzn@xcf.com.mx"
    },
    {
        "nombre": "GUADALAJARA",
        "latitud": 20.621834822165145,
        "longitud": -103.34221489727497,
        "telefono": "33314-53487 , 33314-53486",
        "correo": "serviciogjm@xcf.com.mx"
    },
    {
        "nombre": "LEON",
        "latitud": 21.097651,
        "longitud": -101.604436,
        "telefono": "477 218 7293 - 447 218 7294",
        "correo": "leg@xcf.com.mx"
    },
    {
        "nombre": "PUEBLA",
        "latitud": 19.117355,
        "longitud": -98.255818,
        "telefono": "222 222-9050",
        "correo": "pue@xcf.com.mx"
    },
    {
        "nombre": "QUERETARO",
        "latitud": 20.555194,
        "longitud": -100.271509,
        "telefono": "442 221 6363",
        "correo": "servicioqro@xcf.com.mx"
    },
    {
        "nombre": "AGUASCALIENTES",
        "latitud": 21.989437,
        "longitud": -102.340301,
        "telefono": "449-97-34-580",
        "correo": "ags@xcf.com.mx"
    },
    {
        "nombre": "SALTILLO",
        "latitud": 25.434626,
        "longitud": -100.930147,
        "telefono": "844 180 0454",
        "correo": "slt@xcf.com.mx"
    },
    {
        "nombre": "SAN LUIS POTOSI",
        "latitud": 22.133946,
        "longitud": -100.934471,
        "telefono": "444 824.2326",
        "correo": "spx@xcf.com.mx"
    },
    {
        "nombre": "TORREON",
        "latitud": 25.5384546,
        "longitud": -103.3838485,
        "telefono": "871 2952908",
        "correo": "tor@xcf.com.mx"
    },
    {
        "nombre": "CANCUN",
        "latitud": 21.04826611989766,
        "longitud": -86.86503940212424,
        "telefono": "998 886 2951",
        "correo": "cun@xcf.com.mx"
    },
    {
        "nombre": "REYNOSA",
        "latitud": 26.038515,
        "longitud": -98.313123,
        "telefono": "899 141 1005 - 899 141 1006",
        "correo": "rey@xcf.com.mx"
    },
    {
        "nombre": "VILLAHERMOSA",
        "latitud": 17.981229,
        "longitud": -92.995507,
        "telefono": "993 380.2198",
        "correo": "vhx@xcf.com.mx"
    },
    {
        "nombre": "TOLUCA",
        "latitud": 19.296932,
        "longitud": -99.527792,
        "telefono": "728 2822227",
        "correo": "tlc@xcf.com.mx"
    },
    {
        "nombre": "CORDOBA",
        "latitud": 18.857055,
        "longitud": -96.912646,
        "telefono": "271 751-0646",
        "correo": "cba@xcf.com.mx"
    },
    {
        "nombre": "CHIHUAHUA",
        "latitud": 28.714564,
        "longitud": -106.119677,
        "telefono": "614 417 4047 - 614 417 0411",
        "correo": "chx@xcf.com.mx"
    },
    {
        "nombre": "HIDALGO CHIAPAS",
        "latitud": 14.673346,
        "longitud": -92.15482,
        "telefono": "962 698.0692",
        "correo": "hch@xcf.com.mx"
    },
    {
        "nombre": "CD. JUAREZ",
        "latitud": 31.701762,
        "longitud": -106.427134,
        "telefono": "656 687 8811",
        "correo": "jux@xcf.com.mx"
    },
    {
        "nombre": "MERIDA",
        "latitud": 20.949274186077982,
        "longitud": -89.70334731654042,
        "telefono": "999 688.5660",
        "correo": "mer@xcf.com.mx"
    },
    {
        "nombre": "COATZACOALCOS",
        "latitud": 18.123182,
        "longitud": -94.54819,
        "telefono": "993 3802198 - 993 3802028",
        "correo": "coa@xcf.com.mx",
        "mensaje": "Atiende: VHX"
    },
    {
        "nombre": "AEROPUERTO",
        "latitud": 19.391958,
        "longitud": -99.079716,
        "telefono": "55 2643.5513",
        "correo": "aim@xcf.com.mx"
    },
    {
        "nombre": "HERMOSILLO",
        "latitud": 29.003749,
        "longitud": -100.910548,
        "telefono": "662 313 1080 , 662 313 1083",
        "correo": "hmo@xcf.com.mx"
    },
    {
        "nombre": "LAZARO CARDENAS",
        "latitud": 17.9702816,
        "longitud": -102.1906981,
        "telefono": "753 532 1674 , 753 537 7039",
        "correo": "lcm@xcf.com.mx"
    },
    {
        "nombre": "CULIACAN",
        "latitud": 24.765926,
        "longitud": -97.447687,
        "telefono": "667 275 6246",
        "correo": "cux@xcf.com.mx"
    },
    {
        "nombre": "LOS MOCHIS",
        "latitud": 25.8170509,
        "longitud": -108.9629736,
        "telefono": "667 275 6246",
        "correo": "serviciomox@xcf.com.mx",
        "mensaje": "Atiende: CUX"
    },
    {
        "nombre": "TIJUANA",
        "latitud": 32.4937713,
        "longitud": -116.8939391,
        "telefono": "664 200 3208",
        "correo": "tij@xcf.com.mx"
    },
    {
        "nombre": "CELAYA",
        "latitud": 20.510847,
        "longitud": -100.812153,
        "telefono": "477 980 7966 / 77",
        "correo": "cel@xcf.com.mx"
    },
    {
        "nombre": "CUERNAVACA",
        "latitud": 18.90716,
        "longitud": -99.178583,
        "telefono": "",
        "correo": "",
        "mensaje": "Atiende: TLC"
    },
    {
        "nombre": "MEXICALI",
        "latitud": 32.668523,
        "longitud": -105.414197,
        "telefono": "664 200-3208",
        "correo": "tij@xcf.com.mx",
        "mensaje": "Atiende: TIJ"
    },
    {
        "nombre": "IRAPUATO",
        "latitud": 20.629483,
        "longitud": -101.291783,
        "telefono": "477 218.7293",
        "correo": "leg@xcf.com.mx",
        "mensaje": "Atiende: LEG"
    },
    {
        "nombre": "ENSENADA",
        "latitud": 31.769267,
        "longitud": -96.588594,
        "telefono": "664 200-3208",
        "correo": "norma.mata@xcf.com.mx",
        "mensaje": "Atiende: TIJ"
    },
    {
        "nombre": "PACHUCA",
        "latitud": 19.836320468040203,
        "longitud": -98.95429925767111,
        "telefono": "77 9100 3435",
        "correo": "serviciomxm@xcf.com.mx"
    }
];

// Función para crear un marcador
function crearMarcador(sucursal) {
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([sucursal.longitud, sucursal.latitud])),
        nombre: sucursal.nombre,
        telefono: sucursal.telefono,
        correo: sucursal.correo,
        mensaje: sucursal.mensaje
    });

    const marker = new ol.style.Style({
        image: new ol.style.Icon({
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            scale: 0.5
        })
    });

    feature.setStyle(marker);
    return feature;
}

// Crear la capa de marcadores
const vectorSource = new ol.source.Vector();
const vectorLayer = new ol.layer.Vector({
    source: vectorSource
});