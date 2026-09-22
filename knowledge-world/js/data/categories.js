/* ==========================================================================
   LEARNING WORLDS (categories)
   --------------------------------------------------------------------------
   To add a new world: copy one block, give it a unique `id`, pick two colours
   and add items. Every item needs { name, emoji, fact }.
   Games, quizzes, memory, spelling and progress pick it up automatically.
   ========================================================================== */
KW.data.categories = [
  {
    id: 'animals', name: 'Animals', emoji: '🦁', c1: '#FF9F43', c2: '#FF6B81',
    desc: 'Roar, hop and swim with wild friends!',
    items: [
      { name: 'Lion', emoji: '🦁', fact: 'A lion\'s roar can be heard from 8 km away!' },
      { name: 'Tiger', emoji: '🐯', fact: 'Every tiger has its own unique stripe pattern, like a fingerprint.' },
      { name: 'Elephant', emoji: '🐘', fact: 'Elephants are the largest land animals and love to swim.' },
      { name: 'Giraffe', emoji: '🦒', fact: 'A giraffe\'s tongue is purple and about 50 cm long!' },
      { name: 'Monkey', emoji: '🐵', fact: 'Monkeys use their tails to hold on to branches.' },
      { name: 'Zebra', emoji: '🦓', fact: 'No two zebras have exactly the same stripes.' },
      { name: 'Dog', emoji: '🐶', fact: 'A dog\'s nose print is as unique as a human fingerprint.' },
      { name: 'Cat', emoji: '🐱', fact: 'Cats sleep for about 16 hours every day.' },
      { name: 'Cow', emoji: '🐮', fact: 'Cows have best friends and get sad when separated.' },
      { name: 'Horse', emoji: '🐴', fact: 'Horses can sleep both standing up and lying down.' },
      { name: 'Pig', emoji: '🐷', fact: 'Pigs are very smart, smarter than most dogs!' },
      { name: 'Rabbit', emoji: '🐰', fact: 'Rabbits can see almost all the way around them.' },
      { name: 'Bear', emoji: '🐻', fact: 'Bears sleep through the whole winter. That is called hibernation.' },
      { name: 'Panda', emoji: '🐼', fact: 'Pandas eat bamboo for up to 14 hours a day.' },
      { name: 'Koala', emoji: '🐨', fact: 'Koalas sleep up to 20 hours a day in eucalyptus trees.' },
      { name: 'Fox', emoji: '🦊', fact: 'Foxes use the Earth\'s magnetic field to hunt.' },
      { name: 'Frog', emoji: '🐸', fact: 'Frogs drink water through their skin!' },
      { name: 'Penguin', emoji: '🐧', fact: 'Penguins are birds that cannot fly but swim super fast.' },
      { name: 'Owl', emoji: '🦉', fact: 'Owls can turn their heads almost all the way around.' },
      { name: 'Dolphin', emoji: '🐬', fact: 'Dolphins have names for each other made of whistles.' },
      { name: 'Whale', emoji: '🐳', fact: 'The blue whale is the biggest animal that has ever lived.' },
      { name: 'Turtle', emoji: '🐢', fact: 'Some turtles can live for more than 100 years.' },
      { name: 'Crocodile', emoji: '🐊', fact: 'Crocodiles have lived on Earth since the time of dinosaurs.' },
      { name: 'Kangaroo', emoji: '🦘', fact: 'A kangaroo can jump 3 times its own height.' }
    ]
  },
  {
    id: 'fruits', name: 'Fruits', emoji: '🍎', c1: '#FF6B81', c2: '#F368E0',
    desc: 'Sweet, juicy and full of colour!',
    items: [
      { name: 'Apple', emoji: '🍎', fact: 'Apples float in water because they are 25% air.' },
      { name: 'Banana', emoji: '🍌', fact: 'Bananas are berries, but strawberries are not!' },
      { name: 'Orange', emoji: '🍊', fact: 'Oranges are full of vitamin C which keeps you healthy.' },
      { name: 'Grapes', emoji: '🍇', fact: 'Dried grapes are called raisins.' },
      { name: 'Strawberry', emoji: '🍓', fact: 'A strawberry has about 200 tiny seeds on the outside.' },
      { name: 'Watermelon', emoji: '🍉', fact: 'Watermelons are 92% water. Splash!' },
      { name: 'Pineapple', emoji: '🍍', fact: 'A pineapple takes about two years to grow.' },
      { name: 'Mango', emoji: '🥭', fact: 'Mango is called the king of fruits.' },
      { name: 'Cherry', emoji: '🍒', fact: 'Cherries grow in pairs on a tree.' },
      { name: 'Peach', emoji: '🍑', fact: 'Peaches have soft fuzzy skin.' },
      { name: 'Pear', emoji: '🍐', fact: 'Pears ripen better off the tree than on it.' },
      { name: 'Lemon', emoji: '🍋', fact: 'Lemons are so sour they make your face squish!' },
      { name: 'Kiwi', emoji: '🥝', fact: 'Kiwi is named after a fluffy bird from New Zealand.' },
      { name: 'Coconut', emoji: '🥥', fact: 'You can drink the water inside a coconut.' },
      { name: 'Blueberry', emoji: '🫐', fact: 'Blueberries are one of the only naturally blue foods.' },
      { name: 'Melon', emoji: '🍈', fact: 'Melons grow on vines along the ground.' },
      { name: 'Avocado', emoji: '🥑', fact: 'An avocado is a fruit with one giant seed inside.' },
      { name: 'Tomato', emoji: '🍅', fact: 'A tomato is actually a fruit, not a vegetable!' },
      { name: 'Green Apple', emoji: '🍏', fact: 'Green apples taste a little more sour than red ones.' },
      { name: 'Olive', emoji: '🫒', fact: 'Olive oil is made by squeezing olives.' }
    ]
  },
  {
    id: 'vegetables', name: 'Vegetables', emoji: '🥦', c1: '#00D2A8', c2: '#7ED957',
    desc: 'Crunchy veggies that make you strong!',
    items: [
      { name: 'Carrot', emoji: '🥕', fact: 'Carrots help your eyes see better in the dark.' },
      { name: 'Broccoli', emoji: '🥦', fact: 'Broccoli looks like a tiny tree and is full of vitamins.' },
      { name: 'Corn', emoji: '🌽', fact: 'Every ear of corn has about 800 kernels.' },
      { name: 'Potato', emoji: '🥔', fact: 'Potatoes were the first vegetable grown in space.' },
      { name: 'Cucumber', emoji: '🥒', fact: 'Cucumbers are 95% water, very cool and fresh.' },
      { name: 'Eggplant', emoji: '🍆', fact: 'Eggplants are actually berries!' },
      { name: 'Onion', emoji: '🧅', fact: 'Cutting onions can make your eyes water.' },
      { name: 'Garlic', emoji: '🧄', fact: 'Garlic keeps you healthy and tastes strong.' },
      { name: 'Pepper', emoji: '🫑', fact: 'Bell peppers can be green, red, yellow or orange.' },
      { name: 'Chili', emoji: '🌶️', fact: 'Chilies are hot because of something called capsaicin.' },
      { name: 'Mushroom', emoji: '🍄', fact: 'Mushrooms are not plants; they are fungi.' },
      { name: 'Peas', emoji: '🫛', fact: 'Peas grow inside a pod on a climbing vine.' },
      { name: 'Lettuce', emoji: '🥬', fact: 'Lettuce is the main leaf in a salad.' },
      { name: 'Sweet Potato', emoji: '🍠', fact: 'Sweet potatoes are orange inside and taste sweet.' },
      { name: 'Beans', emoji: '🫘', fact: 'Beans give you lots of energy and protein.' },
      { name: 'Pumpkin', emoji: '🎃', fact: 'The biggest pumpkin ever weighed more than a car!' }
    ]
  },
  {
    id: 'transport', name: 'Transport', emoji: '🚀', c1: '#4FB3FF', c2: '#6C5CE7',
    desc: 'Zoom, fly and sail around the world!',
    items: [
      { name: 'Car', emoji: '🚗', fact: 'The first cars were slower than a horse.' },
      { name: 'Bus', emoji: '🚌', fact: 'A bus can carry as many people as 40 cars.' },
      { name: 'Bicycle', emoji: '🚲', fact: 'Riding a bike is good exercise and makes no pollution.' },
      { name: 'Motorcycle', emoji: '🏍️', fact: 'Always wear a helmet on a motorcycle!' },
      { name: 'Train', emoji: '🚆', fact: 'The fastest trains go over 400 km per hour.' },
      { name: 'Airplane', emoji: '✈️', fact: 'Airplanes fly higher than the tallest mountains.' },
      { name: 'Helicopter', emoji: '🚁', fact: 'Helicopters can fly straight up and hover in one spot.' },
      { name: 'Ship', emoji: '🚢', fact: 'Big ships carry thousands of containers across the sea.' },
      { name: 'Boat', emoji: '⛵', fact: 'Sailboats use the wind to move.' },
      { name: 'Rocket', emoji: '🚀', fact: 'Rockets travel at 28,000 km per hour to reach space.' },
      { name: 'Truck', emoji: '🚚', fact: 'Trucks carry food and toys to shops.' },
      { name: 'Tractor', emoji: '🚜', fact: 'Tractors help farmers plant and harvest crops.' },
      { name: 'Taxi', emoji: '🚕', fact: 'Taxis in New York are famous for being yellow.' },
      { name: 'Fire Engine', emoji: '🚒', fact: 'Fire engines carry long ladders and water hoses.' },
      { name: 'Ambulance', emoji: '🚑', fact: 'Ambulances rush to help people who are hurt.' },
      { name: 'Police Car', emoji: '🚓', fact: 'Police cars have flashing lights and a loud siren.' },
      { name: 'Scooter', emoji: '🛴', fact: 'You push a scooter with one foot to go.' },
      { name: 'Hot Air Balloon', emoji: '🎈', fact: 'Hot air rises, so it lifts the balloon up!' }
    ]
  },
  {
    id: 'clothes', name: 'Clothes', emoji: '👕', c1: '#F368E0', c2: '#6C5CE7',
    desc: 'What do we wear every day?',
    items: [
      { name: 'Shirt', emoji: '👕', fact: 'A T-shirt is named after its T shape.' },
      { name: 'Dress', emoji: '👗', fact: 'Dresses come in every colour of the rainbow.' },
      { name: 'Jeans', emoji: '👖', fact: 'Jeans were first made for miners over 150 years ago.' },
      { name: 'Coat', emoji: '🧥', fact: 'A coat keeps you warm on cold days.' },
      { name: 'Hat', emoji: '🎩', fact: 'A hat protects your head from sun and rain.' },
      { name: 'Cap', emoji: '🧢', fact: 'Caps have a brim to shade your eyes.' },
      { name: 'Shoes', emoji: '👟', fact: 'Sneakers are made for running and playing.' },
      { name: 'Boots', emoji: '👢', fact: 'Boots keep your feet dry in the rain and snow.' },
      { name: 'Socks', emoji: '🧦', fact: 'Socks keep your feet warm and cosy.' },
      { name: 'Gloves', emoji: '🧤', fact: 'Gloves have a place for each finger.' },
      { name: 'Scarf', emoji: '🧣', fact: 'A scarf keeps your neck warm in winter.' },
      { name: 'Sandals', emoji: '👡', fact: 'Sandals let your feet feel the breeze in summer.' },
      { name: 'Sunglasses', emoji: '🕶️', fact: 'Sunglasses protect your eyes from bright sunlight.' },
      { name: 'Backpack', emoji: '🎒', fact: 'A backpack carries your books to school.' }
    ]
  },
  {
    id: 'body', name: 'Body Parts', emoji: '🫀', c1: '#FF6B81', c2: '#FF9F43',
    desc: 'Discover your amazing body!',
    items: [
      { name: 'Eye', emoji: '👁️', fact: 'You blink about 15 times every minute.' },
      { name: 'Ear', emoji: '👂', fact: 'Your ears also help you keep your balance.' },
      { name: 'Nose', emoji: '👃', fact: 'Your nose can remember 50,000 different smells.' },
      { name: 'Mouth', emoji: '👄', fact: 'You use your mouth to talk, eat and smile.' },
      { name: 'Tongue', emoji: '👅', fact: 'Your tongue has thousands of tiny taste buds.' },
      { name: 'Tooth', emoji: '🦷', fact: 'Tooth enamel is the hardest part of your body.' },
      { name: 'Hand', emoji: '✋', fact: 'Each hand has 27 bones!' },
      { name: 'Foot', emoji: '🦶', fact: 'A quarter of all your bones are in your feet.' },
      { name: 'Leg', emoji: '🦵', fact: 'The thigh bone is the longest bone in your body.' },
      { name: 'Arm', emoji: '💪', fact: 'Your arms help you lift, hug and wave.' },
      { name: 'Brain', emoji: '🧠', fact: 'Your brain sends messages faster than a race car.' },
      { name: 'Heart', emoji: '🫀', fact: 'Your heart beats about 100,000 times a day.' },
      { name: 'Bone', emoji: '🦴', fact: 'You are born with 300 bones, adults have 206.' },
      { name: 'Lungs', emoji: '🫁', fact: 'Lungs help you breathe in fresh air.' }
    ]
  },
  {
    id: 'colors', name: 'Colours', emoji: '🌈', c1: '#FFC940', c2: '#FF6B81',
    desc: 'Paint the world with colours!',
    items: [
      { name: 'Red', emoji: '🔴', fact: 'Red is the colour of apples, fire engines and strawberries.' },
      { name: 'Orange', emoji: '🟠', fact: 'Orange is named after the fruit!' },
      { name: 'Yellow', emoji: '🟡', fact: 'Yellow is the colour of the sun and bananas.' },
      { name: 'Green', emoji: '🟢', fact: 'Green is the colour of leaves and grass.' },
      { name: 'Blue', emoji: '🔵', fact: 'Blue is the colour of the sky and the sea.' },
      { name: 'Purple', emoji: '🟣', fact: 'Mix red and blue to make purple.' },
      { name: 'Brown', emoji: '🟤', fact: 'Brown is the colour of chocolate and tree trunks.' },
      { name: 'Black', emoji: '⚫', fact: 'Black is the colour of the night sky.' },
      { name: 'White', emoji: '⚪', fact: 'White is the colour of snow and clouds.' },
      { name: 'Pink', emoji: '🌸', fact: 'Mix red and white to make pink.' },
      { name: 'Rainbow', emoji: '🌈', fact: 'A rainbow has 7 colours: red, orange, yellow, green, blue, indigo, violet.' }
    ]
  },
  {
    id: 'shapes', name: 'Shapes', emoji: '🔷', c1: '#6C5CE7', c2: '#4FB3FF',
    desc: 'Circles, squares and stars all around!',
    items: [
      { name: 'Circle', emoji: '⭕', fact: 'A circle has no corners. Wheels are circles!' },
      { name: 'Square', emoji: '🟦', fact: 'A square has 4 equal sides and 4 corners.' },
      { name: 'Triangle', emoji: '🔺', fact: 'A triangle has 3 sides. Pizza slices are triangles!' },
      { name: 'Star', emoji: '⭐', fact: 'A star shape has 5 points.' },
      { name: 'Heart', emoji: '💚', fact: 'A heart shape means love.' },
      { name: 'Diamond', emoji: '💎', fact: 'A diamond shape is a square standing on its corner.' },
      { name: 'Oval', emoji: '🥚', fact: 'An oval is a stretched circle, like an egg.' },
      { name: 'Crescent', emoji: '🌙', fact: 'The moon looks like a crescent some nights.' },
      { name: 'Rectangle', emoji: '📱', fact: 'A rectangle has 2 long sides and 2 short sides.' },
      { name: 'Hexagon', emoji: '🛑', fact: 'A stop sign has 8 sides; a honeycomb cell has 6.' }
    ]
  },
  {
    id: 'space', name: 'Space', emoji: '🪐', c1: '#1F2544', c2: '#6C5CE7',
    desc: 'Blast off to planets and stars!',
    items: [
      { name: 'Sun', emoji: '☀️', fact: 'The Sun is a star. One million Earths could fit inside it!' },
      { name: 'Moon', emoji: '🌙', fact: 'The Moon has no wind, so footprints stay forever.' },
      { name: 'Earth', emoji: '🌍', fact: 'Earth is the only planet we know with life on it.' },
      { name: 'Star', emoji: '⭐', fact: 'Stars twinkle because of moving air in our sky.' },
      { name: 'Rocket', emoji: '🚀', fact: 'A rocket needs to go very fast to escape Earth.' },
      { name: 'Astronaut', emoji: '🧑‍🚀', fact: 'Astronauts float in space because there is no gravity pull.' },
      { name: 'Planet', emoji: '🪐', fact: 'Saturn has beautiful rings made of ice and rock.' },
      { name: 'Comet', emoji: '☄️', fact: 'Comets are dirty snowballs with long glowing tails.' },
      { name: 'Satellite', emoji: '🛰️', fact: 'Satellites help send TV, phone and map signals.' },
      { name: 'Telescope', emoji: '🔭', fact: 'A telescope makes faraway things look close.' },
      { name: 'Alien', emoji: '👽', fact: 'Nobody has found aliens yet, but scientists keep looking!' },
      { name: 'Galaxy', emoji: '🌌', fact: 'Our galaxy is called the Milky Way.' }
    ]
  },
  {
    id: 'jobs', name: 'Jobs', emoji: '🧑‍🚒', c1: '#FF9F43', c2: '#FFC940',
    desc: 'What do you want to be when you grow up?',
    items: [
      { name: 'Doctor', emoji: '🧑‍⚕️', fact: 'Doctors help sick people feel better.' },
      { name: 'Teacher', emoji: '🧑‍🏫', fact: 'Teachers help you learn new things every day.' },
      { name: 'Farmer', emoji: '🧑‍🌾', fact: 'Farmers grow the food we eat.' },
      { name: 'Chef', emoji: '🧑‍🍳', fact: 'Chefs cook delicious meals in restaurants.' },
      { name: 'Firefighter', emoji: '🧑‍🚒', fact: 'Firefighters are brave and put out fires.' },
      { name: 'Police Officer', emoji: '👮', fact: 'Police officers keep everyone safe.' },
      { name: 'Pilot', emoji: '🧑‍✈️', fact: 'Pilots fly airplanes all over the world.' },
      { name: 'Scientist', emoji: '🧑‍🔬', fact: 'Scientists ask questions and do experiments.' },
      { name: 'Artist', emoji: '🧑‍🎨', fact: 'Artists paint and draw beautiful pictures.' },
      { name: 'Astronaut', emoji: '🧑‍🚀', fact: 'Astronauts travel to space in rockets.' },
      { name: 'Mechanic', emoji: '🧑‍🔧', fact: 'Mechanics fix cars and machines.' },
      { name: 'Builder', emoji: '👷', fact: 'Builders make houses, bridges and roads.' }
    ]
  },
  {
    id: 'weather', name: 'Weather', emoji: '⛅', c1: '#4FB3FF', c2: '#00D2A8',
    desc: 'Sunny, rainy, windy or snowy?',
    items: [
      { name: 'Sunny', emoji: '☀️', fact: 'On sunny days, wear a hat and sunscreen.' },
      { name: 'Rainy', emoji: '🌧️', fact: 'Rain comes from clouds full of water drops.' },
      { name: 'Cloudy', emoji: '☁️', fact: 'Clouds are made of tiny drops of water floating in the air.' },
      { name: 'Snowy', emoji: '❄️', fact: 'Every snowflake has 6 sides and is unique.' },
      { name: 'Stormy', emoji: '⛈️', fact: 'Thunder is the sound lightning makes.' },
      { name: 'Windy', emoji: '🌬️', fact: 'Wind is just air moving from one place to another.' },
      { name: 'Rainbow', emoji: '🌈', fact: 'You see a rainbow when the sun shines through rain.' },
      { name: 'Foggy', emoji: '🌫️', fact: 'Fog is a cloud that sits on the ground.' },
      { name: 'Tornado', emoji: '🌪️', fact: 'Tornadoes are spinning columns of very fast wind.' },
      { name: 'Lightning', emoji: '⚡', fact: 'Lightning is hotter than the surface of the sun!' }
    ]
  },
  {
    id: 'sports', name: 'Sports', emoji: '⚽', c1: '#7ED957', c2: '#00D2A8',
    desc: 'Run, jump, kick and score!',
    items: [
      { name: 'Football', emoji: '⚽', fact: 'Football is the most popular sport in the world.' },
      { name: 'Basketball', emoji: '🏀', fact: 'Basketball hoops are 3 metres high.' },
      { name: 'Tennis', emoji: '🎾', fact: 'Tennis balls are fuzzy so they fly straight.' },
      { name: 'Cricket', emoji: '🏏', fact: 'A cricket match can last up to 5 days!' },
      { name: 'Baseball', emoji: '⚾', fact: 'A baseball has 108 red stitches.' },
      { name: 'Swimming', emoji: '🏊', fact: 'Swimming uses almost every muscle in your body.' },
      { name: 'Cycling', emoji: '🚴', fact: 'The Tour de France is a bike race over 3,000 km long.' },
      { name: 'Running', emoji: '🏃', fact: 'The fastest humans run at about 44 km per hour.' },
      { name: 'Skiing', emoji: '⛷️', fact: 'Skiers slide down snowy mountains on two long skis.' },
      { name: 'Boxing', emoji: '🥊', fact: 'Boxers wear soft gloves to protect their hands.' },
      { name: 'Golf', emoji: '⛳', fact: 'A golf ball has about 336 tiny dimples.' },
      { name: 'Badminton', emoji: '🏸', fact: 'Badminton is the fastest racket sport.' }
    ]
  },
  {
    id: 'bugs', name: 'Bugs', emoji: '🦋', c1: '#7ED957', c2: '#FFC940',
    desc: 'Tiny creatures with big surprises!',
    items: [
      { name: 'Butterfly', emoji: '🦋', fact: 'Butterflies taste with their feet!' },
      { name: 'Bee', emoji: '🐝', fact: 'Bees make honey and help flowers grow.' },
      { name: 'Ant', emoji: '🐜', fact: 'Ants can carry 50 times their own weight.' },
      { name: 'Ladybug', emoji: '🐞', fact: 'Ladybugs are red with black spots and eat garden pests.' },
      { name: 'Spider', emoji: '🕷️', fact: 'Spiders have 8 legs and spin silky webs.' },
      { name: 'Snail', emoji: '🐌', fact: 'Snails carry their homes on their backs.' },
      { name: 'Caterpillar', emoji: '🐛', fact: 'A caterpillar turns into a butterfly!' },
      { name: 'Beetle', emoji: '🪲', fact: 'There are more kinds of beetles than any other animal.' },
      { name: 'Cricket', emoji: '🦗', fact: 'Crickets chirp by rubbing their wings together.' },
      { name: 'Mosquito', emoji: '🦟', fact: 'Only female mosquitoes bite.' }
    ]
  },
  {
    id: 'food', name: 'Food', emoji: '🍕', c1: '#FFC940', c2: '#FF9F43',
    desc: 'Yummy things to eat!',
    items: [
      { name: 'Pizza', emoji: '🍕', fact: 'Pizza was invented in Naples, Italy.' },
      { name: 'Burger', emoji: '🍔', fact: 'A burger is a patty inside a round bun.' },
      { name: 'Bread', emoji: '🍞', fact: 'Bread is one of the oldest foods in the world.' },
      { name: 'Cheese', emoji: '🧀', fact: 'There are over 1,800 kinds of cheese.' },
      { name: 'Egg', emoji: '🥚', fact: 'A hen lays about one egg every day.' },
      { name: 'Rice', emoji: '🍚', fact: 'Rice is eaten by half the people on Earth.' },
      { name: 'Cake', emoji: '🎂', fact: 'We eat cake to celebrate birthdays!' },
      { name: 'Ice Cream', emoji: '🍦', fact: 'The most popular ice cream flavour is vanilla.' },
      { name: 'Cookie', emoji: '🍪', fact: 'The chocolate chip cookie was invented by accident.' },
      { name: 'Milk', emoji: '🥛', fact: 'Milk makes your bones and teeth strong.' },
      { name: 'Sandwich', emoji: '🥪', fact: 'A sandwich is anything between two slices of bread.' },
      { name: 'Noodles', emoji: '🍜', fact: 'Noodles were first made in China 4,000 years ago.' }
    ]
  },
  {
    id: 'music', name: 'Music', emoji: '🎸', c1: '#F368E0', c2: '#FF6B81',
    desc: 'Strum, drum and sing along!',
    items: [
      { name: 'Guitar', emoji: '🎸', fact: 'A guitar usually has 6 strings.' },
      { name: 'Piano', emoji: '🎹', fact: 'A piano has 88 black and white keys.' },
      { name: 'Drum', emoji: '🥁', fact: 'Drums are the oldest instruments in the world.' },
      { name: 'Violin', emoji: '🎻', fact: 'A violin is played with a bow made of horse hair.' },
      { name: 'Trumpet', emoji: '🎺', fact: 'A trumpet makes sound when you buzz your lips.' },
      { name: 'Saxophone', emoji: '🎷', fact: 'The saxophone is made of brass but is a woodwind.' },
      { name: 'Microphone', emoji: '🎤', fact: 'A microphone makes your voice louder.' },
      { name: 'Bell', emoji: '🔔', fact: 'Bells ring when you shake or strike them.' },
      { name: 'Headphones', emoji: '🎧', fact: 'Headphones let you listen to music quietly.' },
      { name: 'Musical Note', emoji: '🎵', fact: 'Notes are the letters of music: Do Re Mi!' }
    ]
  }
];
