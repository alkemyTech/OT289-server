const bcrypt = require('bcrypt');
'use strict';

const usersData = [
    {
        firstName: "Pedro",
        lastName: "Vila",
        email: "pedro_vila@protonmail.net",
        password: bcrypt.hashSync("pidegela72", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Alejandra",
        lastName: "Gomez",
        email: "alejandra_gomez@yahoo.com",
        password: bcrypt.hashSync("dorukusi71", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Paula",
        lastName: "Guerrero",
        email: "paula_guerrero@icloud.com",
        password: bcrypt.hashSync("dazegili11", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Pablo",
        lastName: "Marin",
        email: "pablo_marin@hotmail.edu",
        password: bcrypt.hashSync("gixipopu36", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Leonardo",
        lastName: "Mendez",
        email: "leonardo_mendez@icloud.net",
        password: bcrypt.hashSync("sadesubu64", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Martina",
        lastName: "Mora",
        email: "martina_mora@hotmail.net",
        password: bcrypt.hashSync("febizaji95", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Eduardo",
        lastName: "Sanz",
        email: "eduardo_sanz@outlook.org",
        password: bcrypt.hashSync("pifetebo90", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Jose",
        lastName: "Cortes",
        email: "jose_cortes@icloud.org",
        password: bcrypt.hashSync("yagafosa62", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Federico",
        lastName: "Castro",
        email: "federico_castro@icloud.edu",
        password: bcrypt.hashSync("yatuxaza70", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Agustina",
        lastName: "Jimenez",
        email: "agustina_jimenez@outlook.net",
        password: bcrypt.hashSync("disuyeko93", 10),
        roleId: 1,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Federico",
        lastName: "Guerrero",
        email: "federico_guerrero@hotmail.edu",
        password: bcrypt.hashSync("basinogu27", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Sebastian",
        lastName: "Castillo",
        email: "sebastian_castillo@icloud.net",
        password: bcrypt.hashSync("coladoto50", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Sofia",
        lastName: "Lorenzo",
        email: "sofia_lorenzo@outlook.com",
        password: bcrypt.hashSync("yicahiku48", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Daniela",
        lastName: "Pardo",
        email: "daniela_pardo@icloud.edu",
        password: bcrypt.hashSync("xowupibu30", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Daniela",
        lastName: "Vidal",
        email: "daniela_vidal@icloud.net",
        password: bcrypt.hashSync("yabonadu69", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Martín",
        lastName: "Bravo",
        email: "martin_bravo@yahoo.com",
        password: bcrypt.hashSync("ledikaba50", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Valeria",
        lastName: "Soler",
        email: "valeria_soler@aol.com",
        password: bcrypt.hashSync("vabifuva22", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Julia",
        lastName: "Andres",
        email: "julia_andres@google.net",
        password: bcrypt.hashSync("yujitise29", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Andres",
        lastName: "Romero",
        email: "andres_romero@google.com",
        password: bcrypt.hashSync("popiximo40", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    },
    {
        firstName: "Juan Pablo",
        lastName: "Baez",
        email: "juan_baez@outlook.org",
        password: bcrypt.hashSync("gusarota71", 10),
        roleId: 2,
        image: '/images/users/default.jpg',
        createdAt: new Date,
        updatedAt: new Date
    }
]


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', usersData, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
