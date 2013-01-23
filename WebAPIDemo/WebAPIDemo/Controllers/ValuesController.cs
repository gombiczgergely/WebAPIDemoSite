using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPIDemo.Models;

namespace WebAPIDemo.Controllers
{
    public class ValuesController : ApiController
    {
        static public List<string> Names = new List<string>()
        {
            "István", "Viktória", "Béla", "Balázs",
            "Judit", "Miklós", "Ágnes", "Edina"
        };

        static public List<Person> Persons = new List<Person>()
        {
            new Person() { FirstName = "Istvan", LastName = "Reiter" },
            new Person() { FirstName = "Frank", LastName = "Einstein" },
            new Person() { FirstName = "Sue", LastName = "Ellen" }
        };

        // GET api/values
        public IEnumerable<Person> Get()
        {
            return Persons;
        }

        // GET api/values/5
        public Person Get(string id)
        {
            return Persons.First((item) => item.FirstName == id);
        }

        // POST api/values
        public HttpResponseMessage Post([FromBody]Person value)
        {
            return Request.CreateResponse<Person>(HttpStatusCode.Created, value);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]Person value)
        {
            Persons[id] = value;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            Persons.RemoveAt(id);
        }
    }
}