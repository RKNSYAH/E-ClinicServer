const Sequelize = require('sequelize');
const sequelize = require('./connection.js');

const data = sequelize.define(
  'userdata',
  {
    pasen_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(30),
    },
    password: {
      type: Sequelize.STRING,
    },
    nik: {
      type: Sequelize.NUMERIC(16),
    },
    namalengkap: {
      type: Sequelize.STRING(50),
    },
    golongandarah: {
      type: Sequelize.STRING,
    },
    tempatlahir: {
      type: Sequelize.STRING,
    },
    tanggallahir: {
      type: Sequelize.DATEONLY,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    rw: {
      type: Sequelize.NUMERIC(5, 0),
    },
    rt: {
      type: Sequelize.NUMERIC(5, 0),
    },
    kodepos: {
      type: Sequelize.NUMERIC,
    },
    kodewilayah: {
      type: Sequelize.STRING(10),
    },
    jeniskelamin: {
      type: Sequelize.STRING,
    },
    pekerjaan: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  },
);

const user_controls = sequelize.define('user_controls',{
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'userdata',
            schema: 'public',
          },
          key: 'pasen_id'
        }
      },
      is_login: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_logout: {
        type: Sequelize.DATE,
        allowNull: true
      },
      jwt_token: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      device: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1 // 1: USER, 2: DOKTER, 3: ADMIN, 4: SUPERADMIN
      }
    }, {
      tableName: 'user_controls',
      schema: 'users',
      timestamps: false,
      indexes: [
        {
          name: "user_controls_pkey",
          unique: true,
          fields: [
            { name: "id_user" },
          ]
        },
      ]
    })

module.exports = {data, user_controls}
