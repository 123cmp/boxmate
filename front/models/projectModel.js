App.Project = DS.Model.extend({
    name: DS.attr("string"),
    description: DS.attr("string"),
    moqups: DS.hasMany("moqup", {
        async: true
    }),
    group_id: DS.belongsTo('group')
});

App.Project.FIXTURES = [
    {
        id: 0,
        name: "Boxmate",
        description: "Inner project on node.js and ember.js",
        group_id: 0,
        moqups: [0]
    },
    {
        id: 1,
        name: "Health measure web",
        description: "Inner project based on angular",
        group_id: 0,
        moqups: [1]
    },
    {
        id: 2,
        name: "Prydbay",
        description: "Internet-market on JAVA",
        group_id: 1,
        moqups: [2]
    } ,
    {
        id: 3,
        name: "Azbuka",
        description: "Mobile-application for kids studying",
        group_id: 1,
        moqups: [3,4]
    }
];