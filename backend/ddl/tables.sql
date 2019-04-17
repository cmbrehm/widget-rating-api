
create table widget (id serial primary key, 
   name varchar(50) unique);

create table widget_ratings (
   id bigserial primary key, 
   widget_id integer references widget(id),
   rating smallint not null);
