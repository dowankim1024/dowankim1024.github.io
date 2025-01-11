'use strict';

new TypeIt('.home__title--strong',{
    loop: true,
    speed: 100,
}
)
.move(-19)
.type('Amazing ')
.pause(1000)
.move(null, { to: 'END'})
.delete()
.type('Designer')
.pause(1000)
.delete(8)
.type('Developer')
.pause(1000)
.delete(9)
.type('Planner')
.pause(1000)
.delete()
.go();
