App.Moqup = DS.Model.extend({
    name: DS.attr("string"),
    description: DS.attr("string"),
    project: DS.belongsTo('project'),
    file: DS.belongsTo('file')
});

App.Moqup.FIXTURES = [
    {
        id: 0,
        name: "moq1",
        description: "Inner project on node.js and ember.js",
        project: 0,
        file: 0
    },
    {
        id: 1,
        name: "moq1",
        description: "Inner project based on angular",
        project: 1
    },
    {
        id: 2,
        name: "moq1",
        description: "Internet-market on JAVA",
        project: 2
    } ,
    {
        id: 3,
        name: "moq1",
        description: "azbuka moq 1",
        project: 3
    }  ,
    {
        id: 4,
        name: "moq2",
        description: "azbuka moq 2",
        project: 3
    }
];