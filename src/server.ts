import fastify from "fastify";

const server = fastify({ logger: true });

const teams = [
  {
    id: 1,
    name: "McLaren",
    base: "Woking, United Kingdom",
  },
  {
    id: 2,
    name: "Mercedes",
    base: "Brackley, United Kingdom",
  },
  {
    id: 3,
    name: "Red Bull Racing",
    base: "Milton Keynes, United Kingdom",
  },
];

const drivers = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    team: "Ferrai",
  },
  {
    id: 3,
    name: "Lando Norris",
    team: "McLaren",
  },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);

  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);

  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);

    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);

      return { message: "Driver Not found" };
    } else {
      response.type("application/json").code(200);

      return { driver };
    }
  }
);

const port = parseInt(process.env.PORT || "3333");

server.listen({ port }, () => {
  console.log("Server init");
});
