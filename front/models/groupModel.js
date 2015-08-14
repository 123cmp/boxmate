App.Group = DS.Model.extend({
    name: DS.attr("string"),
    description: DS.attr("string"),
    projects: DS.hasMany("project")
});

App.Group.FIXTURES = [
    {
        id: '0',
        name: "Front-end",
        description: "Projects for Front-end developers",
        projects: [0,1]
    },
    {
        id: '1',
        name: "Management",
        description: "Projects for managers and SEO-specialists",
        projects: [2,3]
    }
];