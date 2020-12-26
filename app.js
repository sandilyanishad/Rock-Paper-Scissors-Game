var main_dict = {
    'key': 0, 'value': 'rock'
};
// var color_dict = {};

function picked_one(user_input) {
    var bot_choice = cpu_pick(random_cpu()),
        user_choice = user_input.id;
    var done_matching = get_them_matched(bot_choice, user_choice);
    var result_feed_to_frontend = generate_results(done_matching);
    frontend_changes(user_choice, bot_choice, result_feed_to_frontend, done_matching);
}
function get_them_matched(bot_ch, user_ch) {
    var return_val = { 'bot': 0, 'user': 0 };
    var database = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }        
    }
    user_ch = database[user_ch];
    return_val.user = user_ch[bot_ch];
    return_val.bot = 1 - return_val.user;
    return return_val;
}
function cpu_pick(input) {
    return ['rock', 'paper', 'scissors'][input];
}
function random_cpu() {
    return Math.floor(Math.random() * 3);
}
function generate_results(input) {
    if (input.user === 0)
        return { 'statement': 'You Lost', 'color': 'Red' };
    else if (input.user === 1)
        return { 'statement': 'You Won', 'color': 'Green' };
    else
        return { 'statement': 'You Tied', 'color': 'Blue' };
}
function frontend_changes(user, bot, res, pair) {
    var imageDB = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    var i1_cpu = new Image();
    i1_cpu.src = imageDB[bot];
    i1_cpu.style.boxShadow = '2px 10px 25px ' + chose_colors(pair.bot);
    document.querySelector('.picks').appendChild(i1_cpu);
    var textDiv = document.createElement('div');
    var textNode = document.createTextNode(res.statement);
    textDiv.appendChild(textNode);
    textDiv.style.color = res.color;
    document.querySelector('.picks').appendChild(textDiv);
    var i1_user = new Image();
    i1_user.src = imageDB[user];
    i1_user.style.boxShadow = '2px 10px 25px ' + chose_colors(pair.user);
    document.querySelector('.picks').appendChild(i1_user);
    var reset_image = new Image();
    reset_image.src = 'images/icons/reset.png';
    document.querySelector('.results').appendChild(reset_image);
    reset_image.addEventListener('click', () =>
        window.location.reload()
    )
    reset_image.style.cursor = 'Pointer';
}
function chose_colors(input) {
    if (input === 0)
        return 'Red';
    else if (input === 1)
        return 'Green';
    else
        return 'Blue';
}