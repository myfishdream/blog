// import type { Post } from './types'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn';
import { useClipboard } from '@vueuse/core'
const { copy, isSupported } = useClipboard();

import { toast } from 'vue3-toastify';

    
// 文字格式转换
export function formatSearch(se) {
    if (typeof se !== "undefined") {
        se = se.substr(1);
        var arr = se.split("&"),
            obj = {},
            newarr = [];
        arr.forEach((item) => {
            newarr = item.split("=");
            if (newarr[0]) {
                obj[newarr[0]] = decodeURIComponent(newarr[1]);
            }
        })
        return obj;
    }
}

// 全局使用中文
dayjs.locale('zh-cn')

// 对时间进行格式化
export function formatTime(data, type = 'YYYY-MM-DD') {
    return dayjs(data).format(type)
}
dayjs.extend(rTime)

// 人性化时间格式
export const relativeTime = (value) => {
    return dayjs(value).fromNow()
}

dayjs.extend(duration)
// 人性化时间格式
export const durationTime = (value) => {
    return dayjs.duration(value)
}

// 随机一文
export function randomOne(post) {
    const data = post[getRandomInt(post.length)]
    return data
}

// 获取所有 tag
export function initTags(post) {
    const data = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const tags = element?.frontmatter?.tags
        if (tags) {
            tags.forEach((item) => {
                if (data[item]) {
                    data[item].push(element)
                } else {
                    data[item] = []
                    data[item].push(element)
                }
            })
        }
    }
    return data
}

// 获取所有分类
export function initCats(post) {
    const data = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const categories = element?.frontmatter?.categories
        if (categories) {
            categories.forEach((item) => {
                if (data[item]) {
                    data[item].push(element)
                } else {
                    data[item] = []
                    data[item].push(element)
                }
            })
        }
    }
    return data
}

// 根据tag获取相关文章
export function relatebyTags(post, article) {
    const data = {
        relate: []
    }
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const tags = element?.frontmatter?.tags
        const title = element?.frontmatter?.title
        if (tags) {
            tags.forEach((item) => {
                if (article.frontmatter.tags.includes(item) && title !== article.frontmatter.title) {
                    data['relate'].push(element)
                }
            })
        }
    }
    let uniqueArr = Array.from(new Set(data.relate));
    return uniqueArr
}

// 获取所有存档
export function initArchives(post) {
    let data = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        if (element?.frontmatter?.date) {
            let y = (new Date(element.frontmatter.date).getFullYear());
            let m = (new Date(element.frontmatter.date).getMonth() + 1) + '月';
            if (!data[y]) {
                data[y] = {};
            }
            if (!(data[y][m])) {
                data[y][m] = [];
            }
            data[y][m].push(element);
        }
    }
    return data
}

//
const pattern
    = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export function countWord(data) {
    const m = data.match(pattern)
    let count = 0
    if (!m) {
        return 0
    }
    for (let i = 0; i < m.length; i += 1) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length
        }
        else {
            count += 1
        }
    }
    return count
}

// 通用随机获取方法
export const getRandomInt = (max) =>
    Math.floor(Math.random() * Math.floor(max))

// 通过 token方式获取 github api
export const getGithub = async (name) => {
    const data = await (await fetch(`https://api.github.com/repos/${name}`, {
        headers: {
            // token if necessary
            "Authorization": "",
            "Accept": "",
            "X-GitHub-Api-Version": ""
        }
    })).json()
    if (data) {
        return {
            code: 200,
            data: {
                pushed_at: data?.pushed_at, //最新推送
                updated_at: data?.updated_at, //最后更新
                stargazers_count: data?.stargazers_count, //星星数
                open_issues_count: data?.open_issues_count,     // 问题数
                forks_count: data?.forks_count, //forks
                license: data?.license?.name,   // 许可证   
                homepage: data?.homepage     // 主页
            }
        }
    }
}

// 通用复制提示方式
export function handleCopy(text) {
    if (!isSupported) {
        toast("您的浏览器不支持Clipboard API", {
            autoClose: 3000,
            "type": "error",
        });
        return;
    }
    copy(text)
    toast("复制成功", {
        autoClose: 2000,
        "type": "success",
    });

}

// Supabase配置信息
const SUPABASE_URL = 'https://wyynppzrdxgjdtdrzdqu.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eW5wcHpyZHhnamR0ZHJ6ZHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMDYxMDAsImV4cCI6MjA1NDY4MjEwMH0.OEUVtD1N008Ld1X2usWkVbdCFJstXU2pTECrgi6ND0M'

// 初始化Supabase客户端
async function initSupabase() {
    // 如果在浏览器环境中
    if (typeof window !== 'undefined') {
        // 动态导入supabase-js (避免服务端渲染问题)
        const { createClient } = await import('@supabase/supabase-js')
        return createClient(SUPABASE_URL, SUPABASE_KEY)
    }
    return null
}

// 记录和获取访问量
export async function getPageViews(path = 'home') {
    try {
        const supabase = await initSupabase()
        if (!supabase) return { count: "null" } // 如果supabase为空，返回null
        
        // 检查是否存在记录
        const { data: existingData, error: selectError } = await supabase
            .from('page_views')
            .select('count')
            .eq('path', path)
            .single()
            
        if (selectError && selectError.code !== 'PGRST116') {
            console.error('查询页面访问量时出错:', selectError)
            return { count: 999 }
        }
        
        if (existingData) {
            // 更新计数
            const newCount = existingData.count + 1
            const { error: updateError } = await supabase
                .from('page_views')
                .update({ count: newCount, updated_at: new Date() })
                .eq('path', path)
                
            if (updateError) {
                console.error('更新访问量时出错:', updateError)
                return { count: existingData.count }
            }
            
            return { count: newCount }
        } else {
            // 创建新记录
            const { data: newData, error: insertError } = await supabase
                .from('page_views')
                .insert([{ path, count: 1 }])
                .select()
                
            if (insertError) {
                console.error('创建访问量记录时出错:', insertError)
                return { count: 1 }
            }
            
            return { count: 1 }
        }
    } catch (error) {
        console.error('访问量统计出错:', error)
        return { count: 999 }
    }
}

/*
以下是创建表的SQL代码，包含配置访问权限和身份验证

-- 创建页面访问量表
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引提高查询效率
CREATE INDEX idx_page_views_path ON page_views(path);

-- 启用行级安全策略（RLS）
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 创建策略允许匿名用户读取数据
CREATE POLICY "允许匿名用户读取访问量" 
ON page_views FOR SELECT 
TO anon
USING (true);

-- 创建策略允许匿名用户插入新记录
CREATE POLICY "允许匿名用户插入新记录" 
ON page_views FOR INSERT 
TO anon
WITH CHECK (true);

-- 创建策略允许匿名用户更新现有记录
CREATE POLICY "允许匿名用户更新访问量" 
ON page_views FOR UPDATE 
TO anon
USING (true);

-- 创建函数用于自动更新updated_at字段
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器自动更新updated_at字段
CREATE TRIGGER update_page_views_modtime
BEFORE UPDATE ON page_views
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 可选：创建一个视图用于管理员查看访问量统计
CREATE VIEW page_views_stats AS
SELECT path, count, updated_at, 
       EXTRACT(DAY FROM NOW() - updated_at) AS days_since_update
FROM page_views
ORDER BY count DESC;

-- 可选：创建一个函数用于重置所有页面的访问量计数（管理员使用）
CREATE OR REPLACE FUNCTION reset_page_views()
RETURNS void AS $$
BEGIN
    UPDATE page_views SET count = 0, updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
*/


/*

在Supabase中配置身份验证的步骤：
访问Supabase项目仪表板
进入"身份验证"(Authentication)部分
在"策略"(Policies)选项卡中，确保已经应用了上述RLS策略
在"设置"(Settings)中，可以配置：
允许匿名访问（已启用）
设置JWT令牌过期时间
启用/禁用自注册（可选）
Supabase默认会使用JWT令牌进行身份验证。在我们的方案中，匿名用户（anon角色）具有读取和更新访问量的权限。如果需要更严格的控制，可以修改上述策略，仅允许更新特定条件下的记录。
在函数中已使用的SUPABASE_URL和SUPABASE_KEY已经配置好，可以直接使用：
URL: https://********.supabase.co
匿名密钥: **********

*/

