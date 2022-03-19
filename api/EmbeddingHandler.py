import mxnet as mx
import gluonnlp as nlp
import numpy as np
import os

# Built with help from: 
# Principal Component Analysis with NumPy
# An article written by Wendy Navarrete
# https://towardsdatascience.com/pca-with-numpy-58917c1d0391

###########################
# Load/Read Word Embedding
###########################
def loadDataVocab(embedType, preTrainFile):

     fasttext_2M300d = nlp.embedding.create(embedType,
source=preTrainFile)

     # create vocabulary by using all the tokens
     vocab = nlp.Vocab(nlp.data.Counter(fasttext_2M300d.idx_to_token))
     vocab.set_embedding(fasttext_2M300d)
     #len(vocab.idx_to_token)
     count_tok = nlp.data.Counter(fasttext_2M300d.idx_to_token)
     wordsVocab = [x[0] for x in count_tok.most_common()]

     return vocab, wordsVocab[1:]

def standardize_data(arr):
         
    '''
    This function standardize an array, its substracts mean value, 
    and then divide the standard deviation.
    
    param 1: array 
    return: standardized array
    '''    
    rows, columns = arr.shape
    
    standardizedArray = np.zeros(shape=(rows, columns))
    tempArray = np.zeros(rows)
    
    for column in range(columns):
        
        mean = np.mean(arr[:,column])
        std = np.std(arr[:,column])
        tempArray = np.empty(0)
        
        for element in arr[:,column]:
            
            tempArray = np.append(tempArray, ((element - mean) / std))
 
        standardizedArray[:,column] = tempArray
    
    return standardizedArray


def import_word_list(filename, wordVocab, wordEmbedding):
     with open(".\\Lists\\"+ filename + "\\" + filename + "_usable_words.txt", "r") as reader:
          word_list = reader.read().split(", ")
          word_list_embedding = []
          for word in word_list:
               i = wordVocab.index(word)
               word_list_embedding.append(list(wordEmbedding[i]))
     return word_list, np.array(word_list_embedding, np.float32)
               

def PCA(list_name, number_of_components = 2):
     embedType, preTrainFile = "glove", "glove.6B.300d"
     vocab, all_wordsVocab = loadDataVocab(embedType, preTrainFile)

     all_wordsVocab  = all_wordsVocab[:100000]
     all_WordEmbedding = vocab.embedding[all_wordsVocab].asnumpy()

     word_list_vocab, wordlist_Embedding = import_word_list(list_name, all_wordsVocab, all_WordEmbedding)

     # standardized it
     wordlist_Embedding = standardize_data(wordlist_Embedding)

     # compute eigen matrix
     covariance_matrix = np.cov(wordlist_Embedding.T)
     eigen_values, eigen_vectors = np.linalg.eig(covariance_matrix)


     # # Calculating the explained variance on each of components
     # variance_explained = []
     # for i in eigen_values:
     #      variance_explained.append((i/sum(eigen_values))*100)
        
     # cumulative_variance_explained = np.cumsum(variance_explained)

     projection_matrix = (eigen_vectors.T[:][:number_of_components]).T

     #final step: get the projected coords
     return word_list_vocab, wordlist_Embedding.dot(projection_matrix)

if __name__ == '__main__':
     a1, a2 = PCA("I", 2)
     print(type(a1))
     print(type(list(a2)))