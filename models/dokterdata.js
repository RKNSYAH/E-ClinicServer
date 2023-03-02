const Sequelize = require('sequelize');
const sequelize = require('./connection.js');

const dokter = sequelize.define(
  'dokter',
  {
    dokter_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    nik: {
      type: Sequelize.STRING(16),
    },
    nama: {
      type: Sequelize.STRING(50),
    },
    jenis_kelamin: {
      type: Sequelize.STRING(1),
    },
    keahlian_id: {
      type: Sequelize.BIGINT,
      references: {
        model: {tableName: 'keahlian', schema: 'ref'},
        key: 'keahlian_id'
      }

    },
  },
  {
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dokter_pkey",
        unique: true,
        fields: [
          { name: "dokter_id" },
        ]
      },
    ]

  },
);

const klinik = sequelize.define(
  'klinik',
  {
    klinik_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nama_klinik: {
      type: Sequelize.STRING(100),
    },
    alamat: {
      type: Sequelize.TEXT
    },
    kode_wilayah: {
      type: Sequelize.STRING(10),
    },
    rt: {
      type: Sequelize.NUMERIC(5, 0),
    },
    rw: {
      type: Sequelize.NUMERIC(5, 0),
    },
    kode_pos: {
      type: Sequelize.NUMERIC(5, 0)
    },
    no_kontak: {
      type: Sequelize.STRING(20),
    },
    email: {
      type: Sequelize.STRING(30)
    },
    no_wa: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    instagram: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    twitter: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    facebook: {
      type: Sequelize.TEXT,
      allowNull: true
    },
  },
  {
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "klinik_pkey",
        unique: true,
        fields: [
          { name: "klinik_id" },
        ]
      },
      {
        name: "email_klinik_ukey",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  },
  );

  const golongan_darah = sequelize.define(
    'golongan_darah',
    {
      golongan_darah_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      nama: {
        type: Sequelize.STRING(10),
      }
    },
    {
      timestamps: false,
    },
  )
  const keahlian = sequelize.define(
    'keahlian',
    {
      keahlian_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement :true
      },
      nama_keahlian: {
        type: Sequelize.STRING(255),
      }
    },
    {
      timestamps: false,
      tableName: 'keahlian',
      schema: 'ref',
      indexes: [
        {
          name: "keahlian_pkey",
          unique: true,
          fields: [
            { name: "keahlian_id" },
          ]
        },
      ]  
    },
  )
  const wilayah = sequelize.define(
    'master_wilayah',
    {
      wilayah_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      kode_wilayah: {
        type: Sequelize.STRING(10),
      },
      nama: {
        type: Sequelize.STRING(60),
      },
      id_level_wilayah: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
    },
    {
      timestamps: false,
      schema: 'ref'
    },
  )
  const penyakit = sequelize.define(
    'daftar_penyakit',
    {
      penyakit_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      nama: {
        type: Sequelize.STRING(60),
      }
    },
    {
      timestamps: false,
    },
  )
  const pekerjaan = sequelize.define(
    'pekerjaan',
    {
      pekerjaan_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama: {
        type: Sequelize.STRING(30),
      }
    },
    {
      timestamps: false,
    },
  )
  const klinik_poliklinik = sequelize.define(
    'klinik_poliklinik',{
      poliklinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'poliklinik', schema: 'ref'},
          key: 'poliklinik_id'
        }
      },
      klinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'klinik', schema: 'public'},
          key: 'klinik_id'
        }
      },
    },
    {
      schema: 'ref',
      timestamps: false
    }
  )
  const poliklinik = sequelize.define(
    'poliklinik',{
      poliklinik_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      schema: 'ref',
      timestamps: false,
      
    }
  )

  const klinik_dokter = sequelize.define(
    'dokter_klinik',{
      dokter_id : {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'dokter', schema: 'public'},
          key: 'dokter_id'
        }
      },
      klinik_id : {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model : {tableName: 'klinik', schema: 'public'},
          key: 'klinik_id'
        }
      },
    },
    {
      schema: 'ref',
      timestamps: false
    }
  )

  klinik.hasMany(klinik_poliklinik, {foreignKey: 'klinik_id'})
  klinik_poliklinik.belongsTo(klinik, {foreignKey: 'klinik_id'})
  klinik_poliklinik.belongsTo(poliklinik, {foreignKey: 'poliklinik_id'})
  poliklinik.hasMany(klinik_poliklinik, {foreignKey: 'poliklinik_id'})
  dokter.hasMany(klinik_dokter, {foreignKey: 'dokter_id'})
  klinik_dokter.belongsTo(dokter, {foreignKey: 'dokter_id'})
  klinik_dokter.belongsTo(klinik, {foreignKey: 'klinik_id'})
  klinik.hasMany(klinik_dokter, {foreignKey: 'klinik_id'})
  dokter.hasOne(keahlian, {sourceKey: 'keahlian_id', foreignKey: 'keahlian_id'})
  keahlian.belongsTo(dokter, {foreignKey: 'keahlian_id'})
module.exports = {wilayah, dokter, klinik, poliklinik, klinik_poliklinik, keahlian, klinik_dokter, golongan_darah}