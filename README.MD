# Bean It

### Bean it ayuda a mandar multiples e-mails de forma sencilla

Diseñada para mandar e-mails basados en un archivo excel (XLSX). Cuenta con 4 presets de mensajes, uso de variables basadas en las columnas del archivo, y también variables fijas establecitas en la ventana de configuración.

Por el momento solo soporta envio desde direcciones de gmail.

Toda información se guarda solo en tu computadora. Bean it no almacena ningún dato.

# Contenidos

- [Configuración](#configuración)
  - [Mail](#configuracion-de-mail)
  - [Variables](#carga-de-variables)
  - [Mensaje](#redacción-del-mensaje)
- [Envio de Mails](#envio-de-mails)
- [Tipos de Errores](#tipos-de-errores)
- [Información de Contacto](#información-de-contacto)
# Configuración



Para poder mandar los e-mails por primera vez se deben realizar 3 pasos:

- Configurar dirección de e-mail para enviar
- Seleccionar un archivo XLSX
- Redactar un mensaje

## Configuracion de mail

En la ventana de configuración se tiene que ingresar tanto el correo como la contraseña de aplicación. Esta contraseña es distinta a la que se utiliza en el ingreso del correo.

Para más información (https://support.google.com/accounts/answer/185833?hl=es)

## Selección de archivo XLSX

En la ventana principal se puede seleccionar un archivo XLSX. Esto carga la dirección del archivo y ejecuta la [carga de variables](#carga-de-variables).

## Carga de variables

Existen 2 tipos de variables en este programa. Las [Variables Fijas](#variables-fijas) se generan de manera manual, y tienen prioridad por sobre las [Variables Dinámicas](#variables-dinamicas). Esto significa que si se repiten las variables, se utilizara la Variable Fija.

Para utilizar las variables en la [Redacción del mensaje](#variables-dinámicas) se tienen que encerrar en llaves {}.

### Variables fijas

En la ventana de configuración se pueden generar variables que se aplican tanto en la visualización como al momento de enviar los emails. Primero se le da un nombre y se agrega. Si no existe una variable con ese nombre se agrega a la lista y ahi se puede asignar un valor.

### Variables Dinámicas

Estas variables se generan luego de la [selección de archivo XLSX](#selección-de-archivo-xlsx).

Se carga la primera fila del archivo como los nombres de las variables y la segunda fila como su valor de ejemplo.

|     | A          | B            | C                      | D         | E            |
| --- | ---------- | ------------ | ---------------------- | --------- | ------------ |
| 1   | **Nombre** | **Apellido** | **Numero de Telefono** | **Abono** | **Mail**     |
| 2   | Dante      | Gonzales     | 321-155-455            | 3100      | ej1@test.com |
| 3   | Tomas      | Bargo        | 342-155-544            | 1700      | ej2@test.com |

En este caso se generan las siguientes Variables Dinámicas:

    Nombre: "Dante"
    Apellido: "Gonzales"
    Numero de Telefono: 321-155-455
    Abono: 3100

## Redacción del Mensaje

En esta sección se redacta el contenido del mail que se va a enviar. Además es el momento de hacer uso de tanto las [Variables Fijas](#variables-fijas) como de las [Variables Dinámicas](#variables-dinamicas).

Utilizando como ejemplo el caso anterior

        Hola {Nombre} {Apellido}, este mes tu abono es de un total de {Abono}

Lo que recibe ej1@test.com

         Hola Dante Gonzales, este mes tu abono es de un total de 3100

Lo que recibe ej2@test.com

         Hola Tomas Bargo, este mes tu abono es de un total de 1700

## Envio de Mails
Los mails se intentan detectar de manera automática. Se asume que existe una casilla con uno de los siguientes nombres: 
[Mail , mail, Email, email, Correo, correo]

En caso de que no exista una columna con uno de esos nombres se devuelve a la seccion de errores como "Mail no definido"

El límite de envios por día es de aproximadamente 400 mails. Este límite es dado por google.


## Tipos de errores

#### Mail no Definido
La casilla bajo la columna designada a direcciones de correo se encontraba vacia.

#### Error de email
Se identifico una dirección de mail pero al momento de enviarlo ocurrio un error. Esto indica que el mail se envio pero el servicio de envios no encontró la dirección objetivo. Recomendamos verificar la dirección ya que es probable que haya ocurrido un typo. 


# Información de contacto
Si querés que me llegue algún comentario sobre la aplicación o una sugerencia lo podes hacer tanto por el mismo programa si tenes configurado el mail. 

O por uno de los siguientes medios:

- [Mail](cherubini.franco@hotmail.com)
- [Linkedin](www.linkedin.com/in/cherubinifranco/)

# Fututo de Bean It
Si bien esto es un simple proyecto para aprender, tengo la intención de expandirlo hasta el cansancio.

Las siguientes carácteristicas por implementar son:
- Actualizaciones automáticas
- Drag & Drop de archivos y fotos.
- Mejor manejo de tickets