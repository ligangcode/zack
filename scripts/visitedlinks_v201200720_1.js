if (window.localStorage)
{
    window.onload = function ()
    {
        //iterate all links on this page,
        //and change the color of the visited links,
        //because "a:visited" does not work when browser is restarted,
        //we didn't use "a:visited"
        var links = document.links;
        for (var i = 0; i < links.length; i++)
        {
            var link = links[i];
            var href = link.href;          
            //use md5 of href instead of href,
            //because length of md5 is shorter,
            //so it takes up less localStorage spaces
            if (localStorage.getItem("v-" + md5(href)))
            {
                link.style.color = "cadetblue";
            }
            if (href.indexOf("ListeningExercise/Episode")>0)
            {
                var episodeId = RegExp("ListeningExercise/Episode/([0-9]+)/").exec(href)[1];
                var lastVisited_EpisodeId = localStorage.getItem("LastVisited_EpisodeId");
                //����һ�η��ʵ�Episodeб��
                if (lastVisited_EpisodeId == episodeId) {
                    link.style.fontStyle = "oblique";
                }
            }
        }
    }
    var curUrl = window.location.href;
    try
    {
        localStorage.setItem("v-" + md5(curUrl), 'v');//mark current url as visited
        if (curUrl.indexOf("ListeningExercise/Episode")>0) {
            var result = RegExp("ListeningExercise/Episode/([0-9]+)/").exec(curUrl);
            var episodeId = result[1];
            localStorage.setItem("LastVisited_EpisodeId", episodeId);//�������һ�η��ʵ�EpisodeId
        }
    }
    catch (err)//if exceeded quote,A QUOTA_EXCEEDED_ERR exception is thrown.
    {
        //Delete the first 100 records
        var keysToBeRemoved = new Array();
        for (var i = 0; i < 100; i++)
        {
            var key = localStorage.key(i);
            if (key&&key.indexOf("v-") == 0)
            {
                keysToBeRemoved.push(key);
            }
        }
        for (var i = 0; i < keysToBeRemoved.length; i++)
        {
            var key = keysToBeRemoved[i];
            localStorage.removeItem(key);
        }
    }
}