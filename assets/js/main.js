(function () {
    axios
        .get('https://api.github.com/users/alejandrogonzalr/repos', {
            params: {
                sort: 'pushed'
            }
          })
        .then(response => {
            // console.log(response.data);
            appendProjects(response.data);
        })
        .catch(err => {
            console.log(err);
        })
})();

function appendProjects(projects) {
    const projectsArea = document.getElementById('projects');
    let renderedProject = 0;

    projects.forEach(project => {
        if (!project.fork && project.name !== 'alejandrogonzalr.github.io' && renderedProject < 10) {
            const content = `
            <div class="column is-half-desktop">
                <div class="card has-text-centered">
                    <div class="card-content">
                        <h5 class="card-title">${normalizeName(project.name)}</h5>
                        <h6 class="card-subtitle">${project.language}</h6>
                        <p>${project.description}</p>
                        <a target="_blank" href="${project.html_url}">View on Github</a>
                    </div>
                </div>
            </div>
            `;
    
            projectsArea.innerHTML += content;
            renderedProject++;
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