# Preguntas sobre el proyecto aplicando TypeScript

## ¿Qué es TypeScript?
TypeScript es un lenguaje de programación que extiende JavaScript al agregarle una característica importante: la posibilidad de definir tipos de datos. Esto significa que puedes especificar qué tipo de información deben tener las variables (como números, textos, etc.) antes de ejecutar el programa.

La principal ventaja de TypeScript es que ayuda a encontrar errores en el código antes de que se ejecute, lo que facilita el desarrollo de aplicaciones grandes y complejas. Además, TypeScript se convierte en JavaScript cuando se ejecuta, por lo que puedes usarlo en cualquier proyecto que ya utilice JavaScript.

## ¿Cuáles son las principales diferencias entre TypeScript y JavaScript?
1. **Tipado Estático vs Dinámico**: 
   - **TypeScript** permite especificar los tipos de datos (como números, cadenas de texto, etc.) de las variables antes de ejecutar el código, lo que ayuda a evitar errores.
   - **JavaScript** es un lenguaje de tipado dinámico, lo que significa que las variables pueden cambiar de tipo durante la ejecución, y no se especifican los tipos previamente.
2. **Detección de Errores**:
   - **TypeScript** detecta errores de tipo y otros problemas durante el desarrollo, antes de ejecutar el programa, gracias a su sistema de tipos.
   - **JavaScript** no tiene este control, lo que significa que los errores solo se notan cuando se ejecuta el código.
3. **Compatibilidad**:
   - **TypeScript** es un superset de **JavaScript**, lo que significa que cualquier código JavaScript válido también es válido en TypeScript.
   - **JavaScript** es el lenguaje básico que se ejecuta en los navegadores y servidores sin ningún tipo de transformación.
4. **Características Avanzadas**:
   - **TypeScript** incluye características adicionales como clases, interfaces, y módulos más avanzados para organizar y estructurar mejor el código.
   - **JavaScript** también tiene soporte para clases, pero es menos estrictamente organizado en comparación con TypeScript.
5. **Compilación**:
   - **TypeScript** necesita ser compilado a **JavaScript** antes de ejecutarse, ya que los navegadores no entienden TypeScript directamente.
   - **JavaScript** se ejecuta directamente en los navegadores o servidores sin necesidad de ser compilado.

## ¿Por qué es útil TypeScript en el desarrollo de aplicaciones ReactJS?
1. **Tipado Estático**: Ayuda a detectar errores en el código antes de que se ejecute, lo que reduce los problemas de tipo y mejora la calidad del código en aplicaciones grandes.
2. **Mejor Autocompletado**: Al definir tipos, los editores de código pueden ofrecer autocompletado más preciso, lo que facilita la escritura de código y reduce los errores.
3. **Mayor Mantenibilidad**: Con **TypeScript**, el código es más fácil de entender y mantener, especialmente en proyectos grandes o cuando varias personas trabajan en el mismo código.
4. **Mejor Integración con Librerías**: TypeScript ofrece tipos predefinidos para muchas librerías populares de **React**, lo que facilita su uso y ayuda a evitar errores.

## ¿Qué es el sistema de tipos en TypeScript y cómo ayuda a evitar errores en tiempo de desarrollo?
El **sistema de tipos** en **TypeScript** permite definir qué tipo de datos (como números, cadenas de texto, booleanos, etc.) puede almacenar una variable. Esto ayuda a garantizar que las variables y funciones manejen los datos de manera coherente y esperada. Al especificar los tipos, **TypeScript** puede verificar el código en tiempo de desarrollo, detectando errores como el uso incorrecto de datos, como intentar sumar un número con un texto. Esto evita que esos errores ocurran cuando el código ya está en producción, mejorando la seguridad y confiabilidad del software.

# Consumo de API para carga de Doctores

Se creó una API Rest para simular el consumo de un servicio. Para dicha acción se utilizo la librería axios. Si bien el proyecto es bastante pequeño y utilizar fetch sería suficiente, debido a la posibilidad y potencial de escalar, se implementó de immediato Axios que tiene más poder y simplicidad al momento de implementarlo. Además se controlaron errores posibles, mostrando un mensaje de error de lo ocurrido y un proceso de carga, en caso que el consumo de la api demore.

# Prevención de vulnerabilidades comunes

Se aplicí sanitización en el proyecto para evitar XXS (cross-site scripting), puntualmente en el formulario de citas para agendar una atención con un doctor.

1. Clickjacking: Se evita configurando la seguridad de la aplicación para que no pueda ser incrustada en otros sitios web sin permiso. Aunque en React no se controla directamente, puedes asegurarte de que el backend envíe encabezados de seguridad adecuados (como X-Frame-Options).

2. SQL Injection: React no maneja bases de datos directamente, pero al hacer solicitudes a la API, no debes enviar consultas SQL desde el frontend. El backend debe usar consultas parametrizadas para evitar que los atacantes inyecten código malicioso en las peticiones.

3. Ataque DoS (Denegación de Servicio): En el frontend, puedes implementar limitaciones en los intentos de envío de formularios (por ejemplo, restringiendo la cantidad de solicitudes por usuario en un tiempo determinado). El backend debe manejar medidas más avanzadas como firewalls, limitación de tráfico y bloqueo de direcciones IP sospechosas.



# Tecnologías utilizadas
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&l"/>


## Como levantar el proyecto

1. Clonar el proyecto:
```bash
git clone 
```
2. Ingresar a la carpeta del proyecto general:
```bash
cd hospital-app
```

3. Descargar dependencias:
```bash
npm install
```

## Para levantar la API:
1. Levantar la API Rest:
```bash
npm run server
```

## Para levantar la APP:
1. Levantar la API Rest:
```bash
npm run dev
```