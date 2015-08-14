App.File = DS.Model.extend({
    fieldname: DS.attr('string'),
    originalname: DS.attr('string'),
    name: DS.attr('string'),
    encoding: DS.attr('string'),
    mimetype: DS.attr('string'),
    path: DS.attr('string'),
    extension: DS.attr('string'),
    size: DS.attr('number'),
    truncated: DS.attr('boolean'),
    buffer: DS.attr(),
    moqup: DS.belongsTo('moqup')
});

App.Moqup.FIXTURES = [
    {
        id: 0,
        fieldname: "test",
        originalname: "test2",
        name: "test3",
        encoding: "utf",
        mimetype: "png",
        path: "utf",
        extension: "png",
        size: 1000,
        truncated: false,
        buffer: null,
        moqup: 0
    }
];