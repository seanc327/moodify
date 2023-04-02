from nrclex import NRCLex
import sys

emotionDic1 = NRCLex("happy").affect_dict
emotionDic2 = NRCLex("happy").affect_dict
emotionDic1.update(emotionDic2)
if len(emotionDic1) == 0:
    print("neutral")
else:
    for i in emotionDic1.keys():
        print(emotionDic1[i][0])
        break

