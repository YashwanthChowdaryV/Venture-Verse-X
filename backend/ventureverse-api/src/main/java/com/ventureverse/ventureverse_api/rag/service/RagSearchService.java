package com.ventureverse.ventureverse_api.rag.service;

import java.util.List;

public interface RagSearchService {

    List<String> search(
            String query
    );
}