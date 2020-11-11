
//URL of the Fuseki server
export const fusekiURL = "http://localhost:3030/";
//export const fusekiURL = "http://192.92.147.18:3030/";

//Query: Select * Where { ?subject ?predicate ?object }
export const queryGetAll = "%0A%0ASELECT+*%0AWHERE+%7B%0A++%3Fsubject+%3Fpredicate+%3Fobject%0A%7D%0A";