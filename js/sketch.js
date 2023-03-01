let slider;

const synth = new Tone.PluckSynth(); 
const drum = new Tone.MembraneSynth();
const metal = new Tone.MetalSynth({
  "frequency" : 75,
  "envelope" : 
  {
    "attack" : 0.001,
    "decay" : 0.6,
    "release" : 0.2
  },
  "harmonicity" : 6.5,
  "modulationIndex" : 40,
  "resonance" : 250,
  "octaves" : 1.5
});

const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);
drum.connect(reverb);
metal.connect(reverb);

let notes = {

    'a': 'C4',
    's': 'D4',
    'd': 'E4',
    'f': 'F4',
    'g': 'G4',
    'h': 'A4',
    'j': 'B4',
    'k': 'C5'
  
}

function setup() {
  createCanvas(400, 400);
  slider = new Nexus.Slider("#slider");
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.98;

  synth.triggerAttackRelease("C4", "8n");

  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 
}

function draw() {
  background(10, 10, 255);
  text('Use the slider to give the sound more or no reverb.', 0, 20);
  text('Press the a, s, d, f, g, h, j, and k keys for a sound.', 0, 215,);
}

function keyPressed() {
  let sound = notes[key]
  console.log(sound);
  
  metal.triggerAttackRelease(sound, "8n", '+0.1');
}