from flask import Flask,request
from flask_cors import CORS
#import pyfasttext
from nltk.tokenize import wordpunct_tokenize as wpt
from nltk.corpus import stopwords
from nltk import pos_tag
from gensim.models.keyedvectors import KeyedVectors as kv
import numpy as np
from pprint import pprint
from google.cloud import storage



# Load Google's pre-trained Word2Vec model.

# client = storage.Client()
# bucket = client.get_bucket('wvectors')
# blob = bucket.get_blob('GoogleNews-vectors-negative300.bin')
# blob.download_to_file(open('GoogleNews-vectors-negative300.bin','wb'))
#model = kv.load_word2vec_format('GoogleNews-vectors-negative300.bin',binary=True)
wv = kv.load('smallkv')



stops = set(stopwords.words())

def arrangeWVecs(text):
    toks = wpt(text)
    alltoks = list(filter(lambda x: x.lower() not in stops,toks))
    wvlist = []
    for tok in alltoks:
        pt = pos_tag([tok])
        if 'J' in pt[0][1] or 'RB' in pt[0][1]:
            continue
        try:
            wvlist.append(wv[tok].tolist())
        except KeyError:
            continue
    return wvlist

class KMC:  # data should be of format [list of nums, list of nums,...]
    def __init__(self, num_clusters, data, text,distance='euclidean'):
        self.num_clusters = num_clusters
        self.clusters = [[] for _ in
                         range(num_clusters)]  # list of num_clusters matrices [kn, dims] where k1+k2+...k2=dataPoints
        self.data = data  # matrix of [datapoints,dims]
        self.numPoints = len(self.data)
        self.text = text

        def genInds():
            nums = []
            while len(nums) < self.num_clusters:
                test = np.random.randint(0, self.numPoints)
                if test in nums:
                    continue
                nums.append(test)
            return nums

        self.centroids = np.array([self.data[ind] for ind in genInds()])  # matrix of [clusters,dims]
        self.loss = 0

    def assignData(self):
        tiled_data = np.tile(self.data, [self.num_clusters, 1])
        tiled_centroids = np.repeat(self.centroids, self.numPoints, axis=0)
        euclidean = np.sum((tiled_data - tiled_centroids) ** 2, axis=1)  # this vector has len clusters*dataPoints
        loss = np.sum(euclidean)
        assignments = np.argmin(np.reshape(euclidean, [self.num_clusters, self.numPoints]), axis=0)
        self.clusters = [[] for _ in range(self.num_clusters)]
        for n, assignment in enumerate(list(assignments)):
            self.clusters[assignment].append(self.data[n])
        self.loss = loss
        # %matplotlib inline
        # plot the 2d graph here
#         fig = plt.figure()
#         ax = fig.add_subplot(111)
#         scatter = ax.scatter(np.array(self.data)[:, 0], np.array(self.data)[:, 1], c=assignments, s=50)
#         for z in self.centroids:
#             ax.scatter(z[0], z[1], s=50, c='red', marker='+')
#         ax.set_xlabel('x')
#         ax.set_ylabel('y')
#         plt.colorbar(scatter)
#         plt.show()

    def recomputeCentroids(self):
        for n, cluster in enumerate(self.clusters):
            self.centroids[n] = np.mean(cluster, axis=0)

    def iteration(self):
        self.assignData()
        self.recomputeCentroids()

    def finish(self):
        self.assignData()
        finalClusters = []
#         for cluster in self.clusters:
#             finalClusters.append([])
#             for vec in cluster:
#                 finalClusters[-1].append(self.getTweet(vec.squeeze().tolist()))
#         self.finalClusters = finalClusters

    def getTweet(self,vector):
        ind = self.data.tolist().index(vector)
        return self.text[ind]

    def train(self, iterations):
        for i in range(iterations):
            self.iteration()
            if i % 5 == 0:
                pass
                print('loss at step ' + str(i) + ': ' + str(self.loss))
            self.loss = 0
        self.finish()

    def __str__(self):
        try:
            for n, cluster in enumerate(self.finalClusters):
                print('cluster ' + str(n) + ':\n')
                pprint(cluster[:10])
            return 'done'
        except Exception:
            return 'train before printing'

def getTopics(clusters,text):
    wvecs = arrangeWVecs(text)
    if len(wvecs)<clusters:
        clusters=len(wvecs)
    kmc = KMC(clusters,wvecs,"blah")
    kmc.train(20)
    allsims = []
    for c in kmc.centroids:
        allsims+=wv.similar_by_vector(c,topn=20)
    return allsims

app = Flask(__name__)
CORS(app)
# model = pyfasttext.FastText()
# model.load_model("SentModelv2.bin")
#
# #input format of {"text":str}
# @app.route('/sentiment-basic', methods=['POST'])
# def sentiment_basic():
#     try:
#         data = request.get_json()
#
#         if data==None:
#             try:
#                 text = request.form['text']
#                 uid = request.form['uid']
#             except KeyError:
#                 return "Error: bad request"
#         else:
#             try:
#                 text = data['text']
#                 uid = data['uid']
#             except KeyError:
#                 return "Error: bad request"
#         fullpred = model.predict_proba([text])
#         type = int(fullpred[0][0][0])-1
#         if type==0:
#             proba = 1-float(fullpred[0][0][1])
#         else:
#             proba = float(fullpred[0][0][1])
#     except Exception as e:
#         return "Other error: " + str(e)
#     return str({'sentiment':proba,'uid':uid})
def cap(n):
    if n>1.0:
        return 1.0
    return n


@app.route('/topic-relation',methods=['POST']) #form {'text':text}
def topicRelation():
    print('hi there')
    topics = ['grow', 'business', 'market', 'product', 'expand', 'inventory', 'capital','potential']
    try:
        data = request.get_json()

        if data==None:
            try:
                text = request.form['text']
                uid = request.form['uid']
            except KeyError:
                return "Error: bad request"
        else:
            try:
                text = data['text']
                uid = data['uid']
            except KeyError:
                return "Error: bad request"
        print('got somewhere...')
        main_topics = getTopics(len(topics),text)
        print(main_topics)
        print('we got topics')
        topicscores = {}
        for t in topics:
            topicscores[t] = 0
        for main_topic in main_topics:
            word = main_topic[0]
            isthere = False
            for topic in topics:
                if topic in main_topic[0]:
                    isthere = True
                    word = topic
                    break
            if isthere:
                if main_topic[1]>topicscores[word]:
                    topicscores[main_topic[0]] = main_topic[1]
        meanscore = cap(np.sum(list(topicscores.values()))/4)
        return str({'uid':uid,'score':meanscore})
    except Exception as e:
        return "Other error " + str(e)




if __name__=='__main__':
    app.run(port=8080)