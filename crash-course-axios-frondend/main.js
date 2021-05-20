//Youtube Crash Course Axios
//Voorbeelden aanspreken endpoints vanuit de frondend.
//Met aantekeningen

//Nieuwe eigen Token
axios.defaults.headers.common['X-Auth-Token'] =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

//Default token
// AXIOS GLOBALS
//Mogelijk deze Token eens veranderen (filmpje: 28:37)
/*
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
*/

// GET REQUEST
function getTodos() {
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos',
        //max 5 terug laten geven (stap 3):
        params: {
            _limit: 5
        }
    })
        //.then(res =>console.log(res.data))   //(res = "response"); (stap 1): eerst getest in de console.log()
        //nu de functie gebruiken (stap 2):
        .then(res => showOutput(res))
        .catch(err =>console.log(err));      //(err = "error")
    //console.log('GET Request');

    // axios({
    //   method: 'get',
    //   url: 'https://jsonplaceholder.typicode.com/todos',
    //   params: {
    //     _limit: 5
    //   }
    // })
    //   .then(res => showOutput(res))
    //   .catch(err => console.error(err));

    //Dit hierboven is de kortere (notatie) versie van het GET-request -->Hier zir de limit van 5 ook in de URL
    /*axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        timeout: 5000  //met een timeout , daarna stopt hij met proberen te laden.
      })
      .then(res => showOutput(res))
      .catch(err => console.error(err));*/
}

//Nog kortere versie:
//axios
//.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//.then(res => showOutput(res))
//.catch(err => console.error(err));

// POST REQUEST
function addTodo() {
    /*axios.post('https://jsonplaceholder.typicode.com/todos')
        .then(res => showOutput(res))
        .catch(err => console.error(err));*/



    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'New Todo',
            completed: false
        })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
    //Weggehaald: "console.log('PUT/PATCH request')"
    //Zowel PUT als PATCH hebben hetzelfde resultaat -->Bij patch verandert de userId niet.
    //anders dan PUT didn't compleatly relpace it. All it did was replace the title ; (what we specified)
    axios
        .patch('https://jsonplaceholder.typicode.com/todos/1', {
            title: 'Updated Todo',
            completed: true
        })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
    // Weggehaald: "console.log('DELETE Request');"

    axios
        .delete('https://jsonplaceholder.typicode.com/todos/1')
        //er hoeft verder hier geen data toegevoegd te worden
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// SIMULTANEOUS DATA

//met console.log()specifieke eruit halen vb:
/*function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'), //5 keer todos
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')  //5 keer posts
  ])
      .then(res => {
        console.log(res[0]);
        console.log(res[1]);
        showOutput(res[1]);
      })
      .catch(err => console.log(err));
}*/


function getData() {
    //Deze is korter dmv .spread
    //geeft acces to todos maar geeft alleen posts op scherm
    //axios.all will take in an array of requests als je meerdere dingen wilt opvragen, voor wellicht tabel vullen?)
    //Weghalen :"console.log('Simultaneous Request');"
    axios
        .all([
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'), //5 keer todos
            axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')  //5 keer posts
        ])
        .then(axios.spread((todos, posts) => showOutput(posts)))
        .catch(err => console.error(err));
}

// CUSTOM HEADERS (-->Zo heet dat)
function customHeaders() {
    //Dit voorbeeld moet je ingeloged zijn om een post te mogen doen
    //Weghalen: "console.log('Custom Headers');"
    //Dit is het ingelogd zijn deel.
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'sometoken'
        }
    };

    //Dit voorbeeld moet je dus ingeloged zijn om een post te mogen doen, hier krijg je wat ik bij Novi heb geleerd
    //Dit is wat er vervolgens gepost wordt:
    axios
        .post(
            'https://jsonplaceholder.typicode.com/todos',
            {
                title: 'New Todo',
                completed: false
            },
            config
        )
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    console.log('Transform Response');
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };

    axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
    console.log('Error Handling');
    axios
        .get('https://jsonplaceholder.typicode.com/todoss', { //die extra s bij todoss zorgt voor de 404 error
            // validateStatus: function(status) {
            //   return status < 500; // Reject only if status is greater or equal to 500
            // Voorwaardes aan laden; de catch wordt niet geladen
            // }
        })
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response) {
                // Server responded with a status other than 200 range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status === 404) {
                    alert('Error: Page Not Found'); //ja dit is die popup!!!
                }
            } else if (err.request) {
                // Request was made but no response
                console.error(err.request);
            } else {
                console.error(err.message);
            }
        });
}

// CANCEL TOKEN
function cancelToken() {
    // Verwijderen: "console.log('Cancel Token');"
    const source = axios.CancelToken.source();

    axios
        .get('https://jsonplaceholder.typicode.com/todos', {
            cancelToken: source.token
        })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            }
        });

    if (true) {
        source.cancel('Request canceled!'); //Canseled gewoon, zelfs geen response terug. Zie console.
    }
}

// INTERCEPTING REQUESTS & RESPONSES
//In de console zie je dan steeds (een "log") wat er gebeurd is
//Geen console.log()
axios.interceptors.request.use(
    config => { //geeft dus acces to everything in the config!!
        console.log(
            `${config.method.toUpperCase()} request sent to ${
                config.url
            } at ${new Date().getTime()}`
        );

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// AXIOS INSTANCE
//Geen console.log()
const axiosInstance = axios.create({
    // Other custom settings
    baseURL: 'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

