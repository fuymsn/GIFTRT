/**
 * Created by nicholas on 2016/10/5.
 */
class Video {
    /**
     * 初始化关注
     */
    static initFollowStatusForVideoLists(videoLists) {

        if (Object.keys(videoLists.following).length === 0)
            return false;
        let _videoLists = Object.assign({}, videoLists);
        for (let listType in _videoLists) {
            if (listType == 'following') continue;
            Video.setFollowStatusForVideoList(videoLists[listType], Object.keys(videoLists.following))
        }
        return _videoLists;
    }

    /**
     * 设置列表关注状态
     */
    static setFollowStatusForVideoList(list, followUidList) {
        for (let uid in list) {
            list[uid].following = !!followUidList.includes(uid);
        }
    }
}

export default Video;