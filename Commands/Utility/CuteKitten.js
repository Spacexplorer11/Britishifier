const { SlashCommandBuilder } = require('discord.js');

const historyKitten = [];

const cuteKittenPics =[
  "https://media.gettyimages.com/id/1421837158/photo/fluffy-red-kitten-with-blue-eyes.jpg?s=612x612&w=0&k=20&c=DwVanJ2shYrvjrPP6bjitKkOGuletJ45cMwLQU8qBXM=",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1250677517.jpg?fit=700,700",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-138468381-scaled-e1619028416767.jpg?fit=700,700",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-10100201-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-146242247-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-146242247-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-979081604-scaled-e1619015683323.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-552105001-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-540542926-scaled-e1619016093503.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1271172807.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1203033096-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-936542938-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1199241887-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1097609756-e1619016921841.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-540444329.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-85123446-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-671211062-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-sb10061939i-001.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-510428711.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-10184996-scaled-e1619020676597.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-167792988-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-200396789-001-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-987491478-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1293973214.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1296443787.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-145679137-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1225161230-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-610742722-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-707551235.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1072297938-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1210629577-scaled-e1619022724981.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-463267555-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1196955182-scaled-e1619022923705.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-170031582-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-879497264-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1150883751-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1301027883-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1283823314-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1234957668-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-907415290-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1272381151-1-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-998829786-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-820787670-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-955480082-scaled.jpg?fit=335,335",
  "https://www.rd.com/wp-content/uploads/2021/04/GettyImages-936176546-1.jpg?fit=335,335",
  "https://media.gettyimages.com/id/955480082/photo/two-kittens-in-a-domestic-environment.jpg?s=612x612&w=0&k=20&c=4qWUE-LgM_WFirv3-w4l-lzr8ohtJQ3IA5dUbgvi1dY=",
  "https://media.gettyimages.com/id/121982182/photo/kitten-licking-its-lips.jpg?s=612x612&w=0&k=20&c=Mev1ogJmdyhKTe1zdUsi8pe9BzbFpKocwM3y971IURM=",
  "https://media.gettyimages.com/id/187144066/photo/munchkin-pets.jpg?s=612x612&w=0&k=20&c=OqnFPMGkEPwG94hu_8MLqTfFY_jJvN8Vmmv8Sb8mjpQ=",
  "https://media.gettyimages.com/id/1349412483/photo/fluffy-red-kitten-looking-at-camera.jpg?s=612x612&w=0&k=20&c=cvuzxZCmyBXxZza7L-KDAQmeZrxINVYSKBFKjQLvYjM=",
  "https://media.gettyimages.com/id/1490576202/photo/purebred-scottish-straight-golden-shaded-chinchilla-kitten-sleeping-lying-on-back-on-a-white.jpg?s=612x612&w=0&k=20&c=Nw5j87hHJr7qFfqzbjwdMh2prsUGpn62zIvNazJ7bF8=",
  "https://media.gettyimages.com/id/1138179540/photo/funny-kittens.jpg?s=612x612&w=0&k=20&c=hH6OUqVIo5oLI-rEe-5TCvpnaGFaTON9HtCSmIfuPgI=",
  "https://media.gettyimages.com/id/1309487298/photo/human-cat-relationship.jpg?s=612x612&w=0&k=20&c=K2PywxAB_shHQ1X30AeiYW_xR19l8abB5SxYiwlkbyU=",
  "https://media.gettyimages.com/id/1199242002/photo/kitten-looking-up-towards-the-camera.jpg?s=612x612&w=0&k=20&c=AQF0-o74K-DSpKeGhnfM3vyi1tZMMVIgS7W_3TQiUbU=",
  "https://media.gettyimages.com/id/1178098244/photo/cat-on-a-bed-and-feet-of-a-person.jpg?s=612x612&w=0&k=20&c=GXl32UstQbGxZHzjnAFDisbDUIL-DJ7unxQhSgJrTpg=",
  "https://media.gettyimages.com/id/1127317526/photo/scottish-fold-playing.jpg?s=612x612&w=0&k=20&c=0geqmDLq1URxg7zgCwwcPpq_KyRIXcFGIUv19xBR8kw=",
  "https://media.gettyimages.com/id/868495272/photo/ginger-kitten.jpg?s=612x612&w=0&k=20&c=7k7X3HAcTwwKAgdd5B-rcIiOJIp7kJDYQK_z4ws4H_U=",
  "https://media.gettyimages.com/id/71919616/photo/kitten-and-puppy-on-lawn.jpg?s=612x612&w=0&k=20&c=D_Lm87Qsuq1bZD7edmWabYaed5PzOGjTyqjojxdSfi0=",
  "https://media.gettyimages.com/id/1342433338/photo/black-cat-posing-in-colorful-geometry-shapes.jpg?s=612x612&w=0&k=20&c=AqUceWHdwDM9NV9iUPYAHsBG0NAe4VIhzZ6iX0bReok=",
  "https://th.bing.com/th/id/OIP.gKch8FvT3TtMwNqi8atXEwHaJ6?w=185&h=248&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.9RHXB-YnpZz7J1tjr8XMjwHaHa?w=185&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.YHnjXZY0RcnUwYhMzp6ghwHaI8?w=186&h=225&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.Ur7Vx6BLwmQTYtSHUPVKeAHaJ2?w=186&h=248&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.979x6oo32CCwgLaCAjjhCwHaLR?w=186&h=284&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP._H_kMZuxODXOVnfaUsZvMwHaKG?w=186&h=254&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.K3TV_1KVr-3Nur9KLuMeWgHaE7?w=186&h=123&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.tq89BOxcG3eaLclRcb9IaQHaFw?w=186&h=145&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th/id/OIP.PxuPM8GJoO4D2Z0n1hqpsAAAAA?w=186&h=219&c=7&r=0&o=5&dpr=2&pid=1.7",
]

async function cuteKitten(message){
   // Get a random index from the array
   const randomIndex = Math.floor(Math.random() * cuteKittenPics.length);
   // Use the random index to get the random element
   const randomElement = cuteKittenPics[randomIndex];
   if (historyKitten.length > 4) {
    historyKitten.splice(4,1);
    console.log("Removed element from historyKitten")
  } 
   if (historyKitten.includes(randomElement)){
     return cuteKitten(message);
   } else {
    historyKitten.unshift(randomElement);
    await message.channel.send(randomElement);
    return randomElement;
   }
}


module.exports = {
  data: new SlashCommandBuilder()
      .setName('cute-kitten')
      .setDescription('Sends a cute kitten picture'),
  async execute(interaction) {
      try {
        await interaction.reply("Super duper cuteness coming right up: \n")
          await cuteKitten(interaction);
        } catch (error) {
          console.error(error);
          await interaction.reply({content: 'An error occurred while executing the command.', ephemeral: true});

      }
  },
};