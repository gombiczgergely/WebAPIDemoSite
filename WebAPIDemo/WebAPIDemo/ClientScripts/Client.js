
function PersonViewModel(firstName, lastName, id) {
    this.firstName = ko.observable(firstName);
    this.lastName = ko.observable(lastName);
    this.id = ko.observable(id);
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
                            self.persons.push(new PersonViewModel(value.firstName, value.lastName, key));
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
        $.ajax({
            url: "api/Values/" + person.id(),
            type: "DELETE",
            cache: false,
            success: self.get
        });
    };

    self.update = function (person) {
        $.ajax({
            url: "api/Values/" + person.id(),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            type: "PUT",
            cache: false,
            data: ko.toJSON(person),
            success: self.get
        });
    };
}
