PGDMP  /    :                |            escuela    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    1927787    escuela    DATABASE     }   CREATE DATABASE escuela WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE escuela;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    1927798    estudiantes    TABLE     �   CREATE TABLE public.estudiantes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    fecha_nacimiento date NOT NULL
);
    DROP TABLE public.estudiantes;
       public         heap    postgres    false    4            �            1259    1927797    estudiantes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estudiantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estudiantes_id_seq;
       public          postgres    false    4    218            �           0    0    estudiantes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.estudiantes_id_seq OWNED BY public.estudiantes.id;
          public          postgres    false    217            �            1259    1927807    estudios    TABLE     �   CREATE TABLE public.estudios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    profesor_id integer
);
    DROP TABLE public.estudios;
       public         heap    postgres    false    4            �            1259    1927806    estudios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estudios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.estudios_id_seq;
       public          postgres    false    4    220            �           0    0    estudios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.estudios_id_seq OWNED BY public.estudios.id;
          public          postgres    false    219            �            1259    1927821    inscripciones    TABLE     �   CREATE TABLE public.inscripciones (
    id integer NOT NULL,
    estudiante_id integer,
    estudio_id integer,
    fecha_inscripcion date NOT NULL
);
 !   DROP TABLE public.inscripciones;
       public         heap    postgres    false    4            �            1259    1927820    inscripciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inscripciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.inscripciones_id_seq;
       public          postgres    false    4    222            �           0    0    inscripciones_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.inscripciones_id_seq OWNED BY public.inscripciones.id;
          public          postgres    false    221            �            1259    1927789 
   profesores    TABLE     �   CREATE TABLE public.profesores (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    email character varying(100) NOT NULL
);
    DROP TABLE public.profesores;
       public         heap    postgres    false    4            �            1259    1927788    profesores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.profesores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.profesores_id_seq;
       public          postgres    false    216    4            �           0    0    profesores_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.profesores_id_seq OWNED BY public.profesores.id;
          public          postgres    false    215            *           2604    1927801    estudiantes id    DEFAULT     p   ALTER TABLE ONLY public.estudiantes ALTER COLUMN id SET DEFAULT nextval('public.estudiantes_id_seq'::regclass);
 =   ALTER TABLE public.estudiantes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            +           2604    1927810    estudios id    DEFAULT     j   ALTER TABLE ONLY public.estudios ALTER COLUMN id SET DEFAULT nextval('public.estudios_id_seq'::regclass);
 :   ALTER TABLE public.estudios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            ,           2604    1927824    inscripciones id    DEFAULT     t   ALTER TABLE ONLY public.inscripciones ALTER COLUMN id SET DEFAULT nextval('public.inscripciones_id_seq'::regclass);
 ?   ALTER TABLE public.inscripciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            )           2604    1927792    profesores id    DEFAULT     n   ALTER TABLE ONLY public.profesores ALTER COLUMN id SET DEFAULT nextval('public.profesores_id_seq'::regclass);
 <   ALTER TABLE public.profesores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            2           2606    1927805 !   estudiantes estudiantes_email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_email_key UNIQUE (email);
 K   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_email_key;
       public            postgres    false    218            4           2606    1927803    estudiantes estudiantes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_pkey;
       public            postgres    false    218            6           2606    1927814    estudios estudios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT estudios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.estudios DROP CONSTRAINT estudios_pkey;
       public            postgres    false    220            8           2606    1927826     inscripciones inscripciones_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.inscripciones DROP CONSTRAINT inscripciones_pkey;
       public            postgres    false    222            .           2606    1927796    profesores profesores_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.profesores
    ADD CONSTRAINT profesores_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.profesores DROP CONSTRAINT profesores_email_key;
       public            postgres    false    216            0           2606    1927794    profesores profesores_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.profesores
    ADD CONSTRAINT profesores_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.profesores DROP CONSTRAINT profesores_pkey;
       public            postgres    false    216            9           2606    1927815 "   estudios estudios_profesor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.estudios
    ADD CONSTRAINT estudios_profesor_id_fkey FOREIGN KEY (profesor_id) REFERENCES public.profesores(id);
 L   ALTER TABLE ONLY public.estudios DROP CONSTRAINT estudios_profesor_id_fkey;
       public          postgres    false    4656    220    216            :           2606    1927827 .   inscripciones inscripciones_estudiante_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id);
 X   ALTER TABLE ONLY public.inscripciones DROP CONSTRAINT inscripciones_estudiante_id_fkey;
       public          postgres    false    222    4660    218            ;           2606    1927832 +   inscripciones inscripciones_estudio_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inscripciones
    ADD CONSTRAINT inscripciones_estudio_id_fkey FOREIGN KEY (estudio_id) REFERENCES public.estudios(id);
 U   ALTER TABLE ONLY public.inscripciones DROP CONSTRAINT inscripciones_estudio_id_fkey;
       public          postgres    false    4662    220    222           