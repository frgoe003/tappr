import React, { useState, useEffect } from "react";
import * as Tone from 'tone'
import * as mm from "@magenta/music";

export default {
    DRUMS: {
        notes: [
        { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
        { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
        { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
        { pitch: 34, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
        { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 44, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        { pitch: 34, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        ],
        quantizationInfo: {stepsPerQuarter: 4},
        tempos: [{time: 0, qpm: 120}],
        totalQuantizedSteps: 11
  },
  DRUM1: {
    notes: [
      { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 44, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
      { pitch: 40, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
      { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 38, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 40, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    tempos: [{time: 0, qpm: 120}],
    totalQuantizedSteps: 11
  },
  DRUM2: {
    notes: [
      { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
      { pitch: 36, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
    ],
    quantizationInfo: {stepsPerQuarter: 1},
    tempos: [{time: 0, qpm: 120}],
    totalQuantizedSteps: 7
  },
  EASY1: {
    notes: [
    { pitch: 34, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
    { pitch: 34, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
    { pitch: 34, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
    { pitch: 34, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },

    { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
    { pitch: 36, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
    { pitch: 36, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },
    { pitch: 36, quantizedStartStep: 14, quantizedEndStep: 15, isDrum: true },
    
    { pitch: 38, quantizedStartStep: 16, quantizedEndStep: 17, isDrum: true },
    { pitch: 38, quantizedStartStep: 18, quantizedEndStep: 19, isDrum: true },
    { pitch: 38, quantizedStartStep: 20, quantizedEndStep: 21, isDrum: true },
    { pitch: 38, quantizedStartStep: 22, quantizedEndStep: 23, isDrum: true },
    
    { pitch: 40, quantizedStartStep: 24, quantizedEndStep: 25, isDrum: true },
    { pitch: 40, quantizedStartStep: 26, quantizedEndStep: 27, isDrum: true },
    { pitch: 40, quantizedStartStep: 28, quantizedEndStep: 29, isDrum: true },
    { pitch: 40, quantizedStartStep: 30, quantizedEndStep: 31, isDrum: true },  

    { pitch: 42, quantizedStartStep: 32, quantizedEndStep: 33, isDrum: true },
    { pitch: 42, quantizedStartStep: 34, quantizedEndStep: 35, isDrum: true },
    { pitch: 42, quantizedStartStep: 36, quantizedEndStep: 37, isDrum: true },
    { pitch: 42, quantizedStartStep: 38, quantizedEndStep: 39, isDrum: true },  
  
    { pitch: 44, quantizedStartStep: 40, quantizedEndStep: 41, isDrum: true },
    { pitch: 44, quantizedStartStep: 42, quantizedEndStep: 43, isDrum: true },
    { pitch: 44, quantizedStartStep: 44, quantizedEndStep: 45, isDrum: true },
    { pitch: 44, quantizedStartStep: 46, quantizedEndStep: 47, isDrum: true },  
  ],
    quantizationInfo: {stepsPerQuarter: 4},
    tempos: [{time: 0, qpm: 120}],
    totalQuantizedSteps: 47
},
DRUMTEST1: {
  notes: [
  { pitch: 34, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  { pitch: 38, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
  { pitch: 34, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
  { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
  { pitch: 34, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
  { pitch: 38, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
  { pitch: 34, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },
  { pitch: 38, quantizedStartStep: 14, quantizedEndStep: 15, isDrum: true },
],
  quantizationInfo: {stepsPerQuarter: 4},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 15
},
DRUMTEST2: {
  notes: [
  { pitch: 34, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
  { pitch: 34, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
  { pitch: 34, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
  { pitch: 34, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
  { pitch: 34, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
  { pitch: 34, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
  { pitch: 34, quantizedStartStep: 12, quantizedEndStep: 13, isDrum: true },
  { pitch: 34, quantizedStartStep: 14, quantizedEndStep: 15, isDrum: true },
],
  quantizationInfo: {stepsPerQuarter: 4},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 15
},
}
     