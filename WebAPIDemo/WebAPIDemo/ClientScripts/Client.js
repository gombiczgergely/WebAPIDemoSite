
function PersonViewModel(firstName, lastName) {
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
}

function PersonsViewModel() {
    var self = this;

    self.itemToAdd = ko.observable(new PersonViewModel("", ""));
    self.persons = ko.observableArray();

    self.get = function () {
        self.persons.removeAll();

        $.ajax({
            url: "api/Values/",
            datatype: "json",
            cache: false,
            statusCode:
                {
                    200: function (data) {
                        $.each(data, function (key, value) {
                            self.persons.push(new PersonViewModel(value.firstName, value.lastName));
                        });
                    }
                }
        });
    };

    self.add = function () {
        var person = ko.toJSON(self.itemToAdd());

        $.ajax({
            url: "api/Values/",
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            cache: false,
            data: person,
            statusCode:
                {
                    201: function (data) {
                        self.persons.push(new PersonViewModel(data.firstName, data.lastName));
                        self.itemToAdd(new PersonViewModel("", ""));
                    }
                }
        });
    };

    self.remove = function (person) {

    };

    self.update = function (person) { };
}
