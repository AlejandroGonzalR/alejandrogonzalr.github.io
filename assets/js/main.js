(function () {
    axios
        .get('https://api.github.com/users/alejandrogonzalr/repos', {
            params: {
                sort: 'pushed'
            }
          })
        .then(response => {
            console.log(response.data);
            appendProjects(response.data);
        })
        .catch(err => {
            console.log(err);
        })
})();

function appendProjects(projects) {
    const projectsArea = document.getElementById('projects');

    projects.forEach(project => {
        if (!project.fork && project.name !== 'alejandrogonzalr.github.io') {
            const content = `
            <div class="col-sm-12 col-md-6 col-xl-6">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${normalizeName(project.name)}</h5>
                        <h6 class="card-subtitle">${project.language}</h6>
                        <p>${project.description}</p>
                        <a target="_blank" href="${project.html_url}">View on Github</a>
                    </div>
                </div>
            </div>
            `;
    
            projectsArea.innerHTML += content;
        }
    });
}

function normalizeName(name) {
    name = name.split('-').join(' ');
    name = name.replace(/[A-Z]/g, letter => {
        return ` ${letter}`;
    });
    name = name.replace(/\b\w/g, letter => {
        return letter.toUpperCase();
    });

    return name;
}